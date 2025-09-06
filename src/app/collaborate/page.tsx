"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CollabForm } from "@/components/collab-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const services = [
  {
    title: "Technical Architecture Review",
    description: "Comprehensive analysis of your system architecture with detailed recommendations for scalability, performance, and reliability improvements.",
    features: [
      "System design assessment",
      "Scalability bottleneck identification", 
      "Security vulnerability analysis",
      "Technology stack evaluation",
      "Performance optimization recommendations",
      "Migration strategy development"
    ],
    duration: "2-4 weeks",
    deliverables: [
      "Detailed architecture report",
      "Scalability roadmap",
      "Security recommendations",
      "Technology migration plan"
    ],
    icon: "🏗️",
    color: "electric-teal"
  },
  {
    title: "Engineering Leadership Consulting",
    description: "Transform your engineering culture and processes to build high-performing, scalable development teams that deliver exceptional results.",
    features: [
      "Team structure optimization",
      "Development process design",
      "Performance framework creation",
      "Hiring and onboarding systems",
      "Engineering culture development",
      "Mentorship program design"
    ],
    duration: "3-6 months",
    deliverables: [
      "Team structure blueprint",
      "Process documentation",
      "Performance metrics framework",
      "Leadership training materials"
    ],
    icon: "👥",
    color: "deep-indigo"
  },
  {
    title: "Fractional CTO Services",
    description: "Strategic technical leadership for startups and growing companies who need senior engineering guidance without a full-time commitment.",
    features: [
      "Technical strategy development",
      "Architecture planning and oversight",
      "Engineering team building",
      "Technology roadmap creation",
      "Investor and stakeholder communication",
      "Risk assessment and mitigation"
    ],
    duration: "6-12 months",
    deliverables: [
      "Technical strategy document",
      "Engineering roadmap",
      "Team hiring plan",
      "Quarterly business reviews"
    ],
    icon: "🚀",
    color: "electric-teal"
  }
];

const testimonials = [
  {
    quote: "Working with them transformed our entire engineering organization. The processes and culture changes delivered immediate results.",
    author: "Sarah Chen",
    role: "VP Engineering",
    company: "TechFlow Inc",
    metric: "3x faster delivery"
  },
  {
    quote: "The architecture review identified critical scalability issues before they became problems. Saved us months of technical debt.",
    author: "Marcus Rodriguez", 
    role: "CTO",
    company: "DataStream Solutions",
    metric: "60% cost reduction"
  },
  {
    quote: "Outstanding technical leadership during our growth phase. Helped scale from 5 to 40 engineers seamlessly.",
    author: "Jennifer Park",
    role: "CEO",
    company: "InnovateLabs",
    metric: "8x team growth"
  }
];

const processSteps = [
  {
    step: "1",
    title: "Initial Consultation",
    description: "Free 30-minute call to understand your challenges, goals, and current situation."
  },
  {
    step: "2", 
    title: "Proposal & Planning",
    description: "Detailed proposal with timeline, deliverables, and success metrics tailored to your needs."
  },
  {
    step: "3",
    title: "Execution & Delivery",
    description: "Hands-on work with regular check-ins, progress reports, and continuous collaboration."
  },
  {
    step: "4",
    title: "Knowledge Transfer",
    description: "Complete documentation, training, and ongoing support to ensure sustainable success."
  }
];

export default function CollaboratePage() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  const handleFormSuccess = (data: any) => {
    setSuccessData(data);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen pt-8 lg:pt-16">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-display font-bold tracking-tight mb-6">
              <span className="text-foreground">Let&apos;s Transform Your</span>
              <br />
              <span className="bg-gradient-to-r from-electric-teal via-deep-indigo to-electric-teal bg-clip-text text-transparent">
                Engineering Organization
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Partner with me to architect scalable systems, build high-performing teams, 
              and deliver enterprise-grade infrastructure that drives business growth.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                Available for new projects
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-electric-teal rounded-full mr-2"></div>
                Response within 24 hours
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              How We Can Work Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the engagement model that best fits your needs and timeline.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Card className="h-full p-8 glass-morphism depth-1 hover:depth-3 card-hover-lift border-white/10 hover:border-electric-teal/30 transition-all duration-300 group">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-electric-teal transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">What&apos;s Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <div className="h-1.5 w-1.5 bg-electric-teal rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Timeline & Deliverables */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Timeline:</h4>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Key Deliverables:</h4>
                      <ul className="space-y-1">
                        {service.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">
                            • {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full glass-morphism border-electric-teal/30 hover:border-electric-teal hover:bg-electric-teal/10 text-foreground transition-colors duration-200"
                  >
                    Discuss This Service
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Our Collaboration Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A structured approach that ensures clarity, alignment, and successful outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-electric-teal rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-display font-bold text-white">
                      {process.step}
                    </span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-electric-teal to-electric-teal/20 transform translate-x-8" />
                  )}
                </div>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">
                  {process.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Client Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real results from organizations that transformed their engineering capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Card className="p-6 glass-morphism depth-1 hover:depth-2 border-white/10 h-full">
                  <div className="mb-4">
                    <p className="text-muted-foreground leading-relaxed italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-electric-teal font-bold text-sm">
                        {testimonial.metric}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        improvement
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
                Ready to Start?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Share your project details and I&apos;ll get back to you within 24 hours 
                with a tailored approach for your specific needs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <CollabForm onSuccess={handleFormSuccess} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="glass-morphism border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-display font-bold text-foreground">
                Request Submitted!
              </h3>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Thank you for your interest! I&apos;ll review your request and get back to you within 24 hours.
            </p>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">
                Reference ID:
              </p>
              <p className="font-mono text-sm text-foreground">
                {successData?.submissionId}
              </p>
            </div>
            {successData?.calendlyUrl && (
              <div>
                <Button
                  onClick={() => window.open(successData.calendlyUrl, '_blank')}
                  className="bg-electric-teal hover:bg-electric-teal/90 text-white"
                >
                  Schedule a Call
                </Button>
              </div>
            )}
            <Button
              variant="outline"
              onClick={() => setShowSuccessModal(false)}
              className="w-full glass-morphism border-white/20"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}