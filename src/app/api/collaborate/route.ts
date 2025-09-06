import { NextRequest, NextResponse } from 'next/server';

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();

// Simple rate limiting function
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // Maximum 5 requests per window

  const current = rateLimitMap.get(ip) || { count: 0, lastRequest: now };

  // Reset if window has passed
  if (now - current.lastRequest > windowMs) {
    current.count = 0;
    current.lastRequest = now;
  }

  current.count++;
  rateLimitMap.set(ip, current);

  return current.count > maxRequests;
}

// Honeypot validation
function isHoneypotTriggered(formData: FormData): boolean {
  // Check for honeypot field (should be empty)
  const honeypot = formData.get('website') || formData.get('url') || formData.get('phone_number');
  return !!honeypot;
}

// Email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate submission ID
function generateSubmissionId(): string {
  return 'sub_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Send email function using custom endpoint
async function sendCollaborationEmail(data: any): Promise<boolean> {
  try {
    const emailPayload = {
      to: 'hntlsquad@gmail.com', // Your actual email
      subject: `New Collaboration Request from ${data.fullName}`,
      html: `
        <h2>New Collaboration Request</h2>
        <p><strong>From:</strong> ${data.fullName} (${data.email})</p>
        <p><strong>Organization:</strong> ${data.organization || 'Not specified'}</p>
        <p><strong>Collaboration Type:</strong> ${data.collabType}</p>
        <p><strong>Budget Range:</strong> ${data.budgetRange || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${data.timeline || 'Not specified'}</p>
        
        <h3>Project Details:</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><strong>Submission ID:</strong> ${data.submissionId}</p>
        <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
        
        ${data.utmSource ? `<p><strong>Source:</strong> ${data.utmSource} / ${data.utmMedium || 'unknown'}</p>` : ''}
        ${data.attachment ? `<p><strong>Attachment:</strong> ${data.attachment.name} (${(data.attachment.size / 1024).toFixed(1)}KB)</p>` : ''}
      `,
      from: 'Principal Engineer <noreply@principal-engineer.com>'
    };

    // Use your custom email endpoint
    const response = await fetch('https://oi-server.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xxx',
        'customerId': 'hntlsquad@gmail.com'
      },
      body: JSON.stringify(emailPayload)
    });

    return response.ok;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

// Send confirmation email to user
async function sendConfirmationEmail(email: string, name: string, submissionId: string): Promise<boolean> {
  try {
    const emailPayload = {
      to: email,
      subject: 'Collaboration Request Received - Principal Engineer',
      html: `
        <h2>Thank you for your collaboration request!</h2>
        <p>Hi ${name},</p>
        <p>I've received your collaboration request and will review it carefully. You can expect a response within 24 hours.</p>
        
        <p><strong>Submission Reference:</strong> ${submissionId}</p>
        
        <p>In the meantime, feel free to explore my <a href="https://principal-engineer.com/portfolio">portfolio</a> to see examples of previous work.</p>
        
        <p>Best regards,<br>Principal Engineer</p>
        
        <hr>
        <p><small>If you have any immediate questions, you can reply to this email.</small></p>
      `,
      from: 'Principal Engineer <hello@principal-engineer.com>'
    };

    const response = await fetch('https://oi-server.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer xxx',
        'customerId': 'hntlsquad@gmail.com'
      },
      body: JSON.stringify(emailPayload)
    });

    return response.ok;
  } catch (error) {
    console.error('Confirmation email failed:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Check rate limiting
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    // Check honeypot
    if (isHoneypotTriggered(formData)) {
      return NextResponse.json(
        { success: false, message: 'Invalid submission.' },
        { status: 400 }
      );
    }

    // Extract form data
    const fullName = formData.get('fullName')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const organization = formData.get('organization')?.toString() || '';
    const collabType = formData.get('collabType')?.toString() || '';
    const budgetRange = formData.get('budgetRange')?.toString() || '';
    const timeline = formData.get('timeline')?.toString() || '';
    const message = formData.get('message')?.toString() || '';
    const attachment = formData.get('attachment') as File | null;

    // UTM and tracking data
    const utmSource = formData.get('utmSource')?.toString();
    const utmMedium = formData.get('utmMedium')?.toString();
    const utmCampaign = formData.get('utmCampaign')?.toString();

    // Validation
    if (!fullName.trim()) {
      return NextResponse.json(
        { success: false, message: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!email.trim() || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Valid email is required.' },
        { status: 400 }
      );
    }

    if (!message.trim() || message.length < 50) {
      return NextResponse.json(
        { success: false, message: 'Please provide more details about your project (minimum 50 characters).' },
        { status: 400 }
      );
    }

    // Validate attachment if present
    if (attachment && attachment.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'Attachment must be under 10MB.' },
        { status: 400 }
      );
    }

    // Generate submission ID
    const submissionId = generateSubmissionId();

    // Prepare submission data
    const submissionData = {
      submissionId,
      fullName,
      email,
      organization,
      collabType,
      budgetRange,
      timeline,
      message,
      attachment,
      utmSource,
      utmMedium,
      utmCampaign,
      submittedAt: new Date().toISOString(),
      ip
    };

    // Send notification email
    const emailSent = await sendCollaborationEmail(submissionData);
    
    // Send confirmation email to user
    const confirmationSent = await sendConfirmationEmail(email, fullName, submissionId);

    // In production, you would save this to a database
    console.log('Collaboration request received:', {
      submissionId,
      fullName,
      email,
      organization,
      collabType,
      budgetRange,
      submittedAt: new Date().toISOString()
    });

    // Determine next steps based on collaboration type
    let nextSteps: any = {};
    
    if (['leadership', 'cto', 'consulting'].includes(collabType)) {
      nextSteps.calendlyUrl = 'https://calendly.com/principal-engineer/consultation';
    }

    return NextResponse.json({
      success: true,
      message: 'Your collaboration request has been submitted successfully!',
      submissionId,
      nextSteps: {
        ...nextSteps,
        followUpEmail: true
      },
      emailSent,
      confirmationSent
    });

  } catch (error) {
    console.error('Form submission error:', error);
    
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}