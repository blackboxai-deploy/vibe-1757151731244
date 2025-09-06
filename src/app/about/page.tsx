"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const timelineEvents = [
  {
    year: "2024",
    title: "Principal Engineer",
    company: "Current Role",
    description: "Leading enterprise-scale architecture initiatives and engineering organization transformation across multiple Fortune 500 companies.",
    achievements: [
      "Architected microservices platform serving 10M+ users",
      "Led 40+ engineer organization through successful digital transformation",
      "Reduced infrastructure costs by $2.5M through optimization initiatives",
      "Established engineering excellence practices adopted company-wide"
    ],
    technologies: ["Kubernetes", "Go", "PostgreSQL", "AWS", "Terraform"]
  },
  {
    year: "2020-2023",
    title: "Senior Staff Engineer",
    company: "TechFlow Industries",
    description: "Led critical system migrations and scaling initiatives while mentoring senior engineers and establishing architectural standards.",
    achievements: [
      "Designed and executed monolith-to-microservices migration",
      "Improved system reliability from 99.5% to 99.99% uptime",
      "Built real-time analytics platform processing 1TB+ daily",
      "Mentored 15+ engineers into senior and staff roles"
    ],
    technologies: ["Python", "Kafka", "Redis", "Docker", "GCP"]
  },
  {
    year: "2017-2020",
    title: "Senior Software Engineer",
    company: "DataStream Solutions",
    description: "Specialized in high-performance distributed systems and machine learning infrastructure for data-intensive applications.",
    achievements: [
      "Built ML platform with 94.7% model accuracy",
      "Optimized query performance by 10x through architectural changes",
      "Led technical due diligence for 3 successful acquisitions",
      "Established CI/CD practices reducing deployment time by 85%"
    ],
    technologies: ["Java", "Scala", "Spark", "Cassandra", "TensorFlow"]
  },
  {
    year: "2012-2017",
    title: "Software Engineer",
    company: "InnovateLabs",
    description: "Full-stack development and system design across multiple products, growing from startup to IPO.",
    achievements: [
      "Built core platform features used by 1M+ customers",
      "Led mobile-first architecture redesign",
      "Implemented security frameworks preventing data breaches",
      "Grew from sole engineer to leading team of 12"
    ],
    technologies: ["JavaScript", "Node.js", "React", "MongoDB", "AWS"]
  }
];

const speakingEngagements = [
  {
    title: "Architecting for Scale: Lessons from 10M+ User Systems",
    event: "TechLeadership Conference 2024",
    date: "March 2024",
    location: "San Francisco, CA",
    description: "Deep dive into architectural patterns and infrastructure decisions that enabled massive scale.",
    videoUrl: "https://www.youtube.com/watch?v=example1"
  },
  {
    title: "Building High-Performance Engineering Teams",
    event: "Engineering Management Summit",
    date: "November 2023", 
    location: "Austin, TX",
    description: "Framework for scaling engineering organizations while maintaining quality and culture.",
    slidesUrl: "https://speakerdeck.com/example1"
  },
  {
    title: "Microservices Migration: Strategy and Execution",
    event: "DevOps World",
    date: "September 2023",
    location: "Virtual",
    description: "Practical playbook for migrating monolithic systems to microservices architecture.",
    videoUrl: "https://www.youtube.com/watch?v=example2"
  },
  {
    title: "Technical Leadership in the Age of AI",
    event: "AI Engineering Conference",
    date: "June 2023",
    location: "New York, NY",
    description: "How engineering leaders can navigate the integration of AI technologies.",
    slidesUrl: "https://speakerdeck.com/example2"
  }
];

const recognition = [
  {
    title: "Top 40 Under 40 in Tech",
    organization: "TechInnovators Magazine",
    year: "2023",
    description: "Recognized for outstanding contributions to enterprise software architecture and engineering leadership."
  },
  {
    title: "Engineering Excellence Award",
    organization: "IEEE Computer Society",
    year: "2022", 
    description: "For developing innovative architectural patterns that improved system reliability across the industry."
  },
  {
    title: "Open Source Contributor of the Year",
    organization: "Cloud Native Computing Foundation",
    year: "2021",
    description: "Significant contributions to Kubernetes ecosystem and microservices tooling."
  }
];

const skills = {
  "Technical Leadership": [
    "System Architecture Design",
    "Technical Strategy & Roadmapping", 
    "Engineering Organization Scaling",
    "Technical Debt Management",
    "Performance Optimization",
    "Security & Compliance"
  ],
  "Technologies": [
    "Go, Python, Java, TypeScript",
    "Kubernetes, Docker, Terraform",
    "PostgreSQL, Redis, Kafka",
    "AWS, GCP, Azure",
    "React, Node.js, GraphQL",
    "Machine Learning & AI"
  ],
  "Management": [
    "Team Building & Mentoring",
    "Process Design & Optimization",
    "Stakeholder Communication",
    "Technical Hiring",
    "Culture Development",
    "Performance Management"
  ]
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-8 lg:pt-16">
      {/* Hero Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col lg:flex-row items-center gap-12"
            >
              {/* Profile Section */}
              <div className="lg:w-1/3">
                <div className="relative">
                  <div className="w-64 h-64 mx-auto lg:w-72 lg:h-72 rounded-2xl overflow-hidden depth-3 card-hover-lift">
                    <img
                      src="https://placehold.co/400x400?text=Professional+headshot+of+Principal+Engineer+in+modern+office+setting"
                      alt="Principal Engineer - Professional headshot"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=Principal+Engineer";
                      }}
                    />
                  </div>
                  {/* Floating accent */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-electric-teal rounded-full opacity-80"></div>
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-deep-indigo/20 rounded-full opacity-60"></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-2/3 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-6">
                    <span className="text-foreground">Building the Future of</span>
                    <br />
                    <span className="bg-gradient-to-r from-electric-teal to-deep-indigo bg-clip-text text-transparent">
                      Engineering Excellence
                    </span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                    With over 12 years of experience transforming engineering organizations, 
                    I specialize in architecting resilient systems and building high-performing 
                    teams that deliver exceptional results at scale.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <Link href="/collaborate">
                      <Button
                        size="lg"
                        className="bg-electric-teal hover:bg-electric-teal/90 text-white font-semibold px-8 py-4 h-12 rounded-lg depth-2 hover:depth-3"
                      >
                        Let&apos;s Work Together
                      </Button>
                    </Link>
                    <Link href="/portfolio">
                      <Button
                        variant="outline"
                        size="lg"
                        className="glass-morphism border-electric-teal/30 hover:border-electric-teal hover:bg-electric-teal/10 text-foreground font-semibold px-8 py-4 h-12 rounded-lg depth-1 hover:depth-2"
                      >
                        View My Work
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
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
              Core Competencies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive blend of technical expertise, leadership experience, 
              and strategic thinking that drives organizational transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Card className="h-full p-8 glass-morphism depth-1 hover:depth-2 border-white/10 hover:border-electric-teal/30 transition-all duration-300">
                  <h3 className="text-xl font-display font-bold text-foreground mb-6 text-center">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {skillList.map((skill, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="h-1.5 w-1.5 bg-electric-teal rounded-full mt-2.5 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Professional Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A track record of delivering exceptional results across diverse technical challenges 
              and organizational contexts.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="relative mb-12 last:mb-0"
              >
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-electric-teal/50 to-electric-teal/10"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-6 top-8 w-4 h-4 bg-electric-teal rounded-full border-4 border-background shadow-lg"></div>

                <div className="ml-20">
                  <Card className="p-8 glass-morphism depth-1 hover:depth-2 border-white/10 hover:border-electric-teal/30 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div>
                        <div className="text-electric-teal font-display font-bold text-lg mb-1">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-display font-bold text-foreground mb-1">
                          {event.title}
                        </h3>
                        <div className="text-muted-foreground font-medium mb-4">
                          {event.company}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {event.description}
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Achievements */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {event.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <div className="h-1.5 w-1.5 bg-electric-teal rounded-full mt-2 mr-3 flex-shrink-0" />
                              <span className="text-muted-foreground">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {event.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-electric-teal/10 text-electric-teal text-xs rounded-full border border-electric-teal/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Engagements */}
      <section id="speaking" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Speaking & Thought Leadership
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sharing insights and best practices with the engineering community 
              through conferences and industry events.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {speakingEngagements.map((talk, index) => (
              <motion.div
                key={talk.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Card className="h-full p-6 glass-morphism depth-1 hover:depth-2 border-white/10 hover:border-electric-teal/30 transition-all duration-300">
                  <div className="mb-4">
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">
                      {talk.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground mb-2">
                      <span className="font-medium">{talk.event}</span>
                      <span>{talk.date}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      {talk.location}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {talk.description}
                  </p>
                  
                  <div className="flex gap-2">
                    {talk.videoUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs glass-morphism border-electric-teal/30 hover:border-electric-teal hover:bg-electric-teal/10"
                        onClick={() => window.open(talk.videoUrl, '_blank')}
                      >
                        Watch Video
                      </Button>
                    )}
                    {talk.slidesUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs glass-morphism border-electric-teal/30 hover:border-electric-teal hover:bg-electric-teal/10"
                        onClick={() => window.open(talk.slidesUrl, '_blank')}
                      >
                        View Slides
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section id="recognition" className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Recognition & Awards
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Industry recognition for contributions to engineering excellence 
              and technical leadership.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recognition.map((award, index) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Card className="h-full p-6 glass-morphism depth-1 hover:depth-2 border-white/10 hover:border-electric-teal/30 transition-all duration-300 text-center">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-lg font-display font-bold text-foreground mb-2">
                    {award.title}
                  </h3>
                  <div className="text-sm text-electric-teal font-medium mb-1">
                    {award.organization}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    {award.year}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {award.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-6">
              Ready to Transform Your Engineering Organization?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let&apos;s discuss how my experience in scaling teams and architecting 
              resilient systems can help achieve your technical goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/collaborate">
                <Button
                  size="lg"
                  className="bg-electric-teal hover:bg-electric-teal/90 text-white font-semibold px-8 py-4 h-12 rounded-lg depth-2 hover:depth-3"
                >
                  Start a Collaboration
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button
                  variant="outline"
                  size="lg"
                  className="glass-morphism border-electric-teal/30 hover:border-electric-teal hover:bg-electric-teal/10 text-foreground font-semibold px-8 py-4 h-12 rounded-lg depth-1 hover:depth-2"
                >
                  Explore My Projects
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}