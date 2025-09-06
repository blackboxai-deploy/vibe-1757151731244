"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { CollaborationFormData } from "@/types";

const collaborationTypes = [
  { id: "consulting", label: "Technical Consulting" },
  { id: "architecture", label: "Architecture Review" },
  { id: "leadership", label: "Engineering Leadership" },
  { id: "mentorship", label: "Team Mentorship" },
  { id: "cto", label: "Fractional CTO" },
  { id: "speaking", label: "Speaking Engagement" },
  { id: "other", label: "Other" }
];

const budgetRanges = [
  { value: "<$5k", label: "Under $5,000" },
  { value: "$5k-$25k", label: "$5,000 - $25,000" },
  { value: "$25k-$100k", label: "$25,000 - $100,000" },
  { value: ">$100k", label: "Over $100,000" }
];

interface CollabFormProps {
  onSuccess?: (data: { submissionId: string; calendlyUrl?: string }) => void;
  className?: string;
}

export function CollabForm({ onSuccess, className = "" }: CollabFormProps) {
  const [formData, setFormData] = useState<CollaborationFormData>({
    fullName: "",
    email: "",
    organization: "",
    collabType: "consulting",
    budgetRange: undefined,
    timeline: "",
    message: "",
    attachment: undefined
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof CollaborationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert("File size must be under 10MB");
        return;
      }
      handleInputChange('attachment', file);
    }
  };

  const validateForm = (): string | null => {
    if (!formData.fullName.trim()) return "Full name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Please enter a valid email";
    if (!formData.message.trim()) return "Message is required";
    if (formData.message.length < 50) return "Please provide more details (at least 50 characters)";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus('error');
      setSubmitMessage(validationError);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare form data with UTM parameters
      const submissionData = {
        ...formData,
        utmSource: new URLSearchParams(window.location.search).get('utm_source'),
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium'),
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        utmTerm: new URLSearchParams(window.location.search).get('utm_term'),
        utmContent: new URLSearchParams(window.location.search).get('utm_content'),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      };

      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.entries(submissionData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'attachment' && value instanceof File) {
            formDataToSend.append(key, value);
          } else {
            formDataToSend.append(key, String(value));
          }
        }
      });

      const response = await fetch('/api/collaborate', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          // Don't set Content-Type header - let browser set it for FormData
        }
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setSubmitMessage("Thank you! Your collaboration request has been submitted successfully. You'll hear back within 24 hours.");
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          organization: "",
          collabType: "consulting",
          budgetRange: undefined,
          timeline: "",
          message: "",
          attachment: undefined
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        // Call success callback
        if (onSuccess) {
          onSuccess({
            submissionId: result.submissionId,
            calendlyUrl: result.nextSteps?.calendlyUrl
          });
        }
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`p-8 glass-morphism depth-2 border-white/10 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Let&apos;s Collaborate
          </h2>
          <p className="text-muted-foreground">
            Share your project details and I&apos;ll get back to you within 24 hours 
            to discuss how we can work together.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Your full name"
                className="glass-morphism border-white/20 focus:border-electric-teal"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
                className="glass-morphism border-white/20 focus:border-electric-teal"
                required
              />
            </div>
          </div>

          {/* Organization */}
          <div className="space-y-2">
            <Label htmlFor="organization" className="text-sm font-medium">
              Organization
            </Label>
            <Input
              id="organization"
              type="text"
              value={formData.organization}
              onChange={(e) => handleInputChange('organization', e.target.value)}
              placeholder="Your company or organization"
              className="glass-morphism border-white/20 focus:border-electric-teal"
            />
          </div>

          {/* Collaboration Type and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="collabType" className="text-sm font-medium">
                Collaboration Type <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.collabType} 
                onValueChange={(value) => handleInputChange('collabType', value)}
              >
                <SelectTrigger className="glass-morphism border-white/20 focus:border-electric-teal">
                  <SelectValue placeholder="Select collaboration type" />
                </SelectTrigger>
                <SelectContent className="glass-morphism border-white/20">
                  {collaborationTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budgetRange" className="text-sm font-medium">
                Budget Range
              </Label>
              <Select 
                value={formData.budgetRange} 
                onValueChange={(value) => handleInputChange('budgetRange', value)}
              >
                <SelectTrigger className="glass-morphism border-white/20 focus:border-electric-teal">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent className="glass-morphism border-white/20">
                  {budgetRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <Label htmlFor="timeline" className="text-sm font-medium">
              Timeline
            </Label>
            <Input
              id="timeline"
              type="text"
              value={formData.timeline}
              onChange={(e) => handleInputChange('timeline', e.target.value)}
              placeholder="e.g., 'Q2 2024' or 'ASAP' or 'Flexible'"
              className="glass-morphism border-white/20 focus:border-electric-teal"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Project Details <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Please describe your project, challenges, and how I can help. Include any relevant technical details, team size, current architecture, etc."
              className="glass-morphism border-white/20 focus:border-electric-teal min-h-[120px] resize-y"
              required
            />
            <p className="text-xs text-muted-foreground">
              Minimum 50 characters. Current: {formData.message.length}
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="attachment" className="text-sm font-medium">
              Attachment (Optional)
            </Label>
            <div className="space-y-2">
              <Input
                id="attachment"
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="glass-morphism border-white/20 focus:border-electric-teal file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-electric-teal/10 file:text-electric-teal hover:file:bg-electric-teal/20"
                accept=".pdf,.doc,.docx,.txt,.md"
              />
              <p className="text-xs text-muted-foreground">
                Max 10MB. Supported formats: PDF, DOC, DOCX, TXT, MD
              </p>
            </div>
          </div>

          {/* Submit Status */}
          {submitStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border ${
                submitStatus === 'success' 
                  ? 'bg-green-500/10 border-green-500/20 text-green-600' 
                  : 'bg-red-500/10 border-red-500/20 text-red-600'
              }`}
            >
              {submitMessage}
            </motion.div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-electric-teal hover:bg-electric-teal/90 text-white font-semibold py-3 h-12 rounded-lg depth-1 hover:depth-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              <>
                Send Collaboration Request
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </>
            )}
          </Button>
        </form>

        {/* Trust indicators */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center mb-2 sm:mb-0">
              <svg className="h-4 w-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Your information is secure and encrypted
            </div>
            <div className="text-center sm:text-right">
              Response within 24 hours • No spam, ever
            </div>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}