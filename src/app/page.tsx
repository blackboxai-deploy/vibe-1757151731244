"use client";

import { HeroBanner } from "@/components/hero-banner";
import { StatStrip } from "@/components/stat-strip";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Featured projects data
const featuredProjects = [
  {
    id: "microservices-migration",
    title: "Enterprise Microservices Migration",
    description: "Led the transformation of a monolithic system to microservices architecture, serving 10M+ users with 99.99% uptime.",
    image: "https://placehold.co/600x400?text=Microservices+Architecture+Migration+Dashboard+with+System+Metrics",
    tags: ["Kubernetes", "Docker", "Go", "PostgreSQL", "Redis"],
    metrics: [
      { label: "Response Time", value: "-85%" },
      { label: "System Uptime", value: "99.99%" },
      { label: "Cost Reduction", value: "$1.2M" }
    ],
    category: "Architecture"
  },
  {
    id: "ai-platform",
    title: "AI-Powered Analytics Platform",
    description: "Designed and built a machine learning platform processing 1TB+ daily data with real-time insights and predictive modeling.",
    image: "https://placehold.co/600x400?text=AI+Analytics+Platform+Dashboard+with+ML+Models+and+Data+Visualizations",
    tags: ["Python", "TensorFlow", "Apache Kafka", "AWS", "Elasticsearch"],
    metrics: [
      { label: "Data Processing", value: "1TB+/day" },
      { label: "Model Accuracy", value: "94.7%" },
      { label: "Processing Speed", value: "10x faster" }
    ],
    category: "Infrastructure"
  },
  {
    id: "team-transformation",
    title: "Engineering Team Scale-up",
    description: "Transformed a 5-person team into a 40+ engineer organization with improved processes, culture, and delivery velocity.",
    image: "https://placehold.co/600x400?text=Engineering+Team+Organization+Chart+and+Development+Process+Flow",
    tags: ["Leadership", "Agile", "DevOps", "Mentoring", "Process Design"],
    metrics: [
      { label: "Team Growth", value: "800%" },
      { label: "Velocity Increase", value: "3.5x" },
      { label: "Retention Rate", value: "95%" }
    ],
    category: "Leadership"
  }
];

const collaborationTypes = [
  {
    title: "Technical Architecture Review",
    description: "Deep-dive analysis of your system architecture with actionable recommendations for scalability and performance.",
    features: ["System Design Analysis", "Scalability Assessment", "Security Review", "Technology Stack Evaluation"],
    icon: "🏗️"
  },
  {
    title: "Engineering Leadership",
    description: "Transform your engineering culture and processes to build high-performing, scalable development teams.",
    features: ["Team Structure Design", "Process Optimization", "Mentorship Programs", "Performance Framework"],
    icon: "👥"
  },
  {
    title: "Fractional CTO",
    description: "Strategic technical leadership for startups and growing companies who need senior engineering guidance.",
    features: ["Technical Strategy", "Architecture Planning", "Team Building", "Technology Roadmap"],
    icon: "🚀"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroBanner />
      
      {/* Stats Section */}
      <StatStrip />

      {/* Featured Projects Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A showcase of high-impact engineering initiatives that transformed businesses 
              and delivered measurable results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <Card className="group overflow-hidden glass-morphism depth-1 hover:depth-3 card-hover-lift border-white/10 hover:border-electric-teal/30 transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x400?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-electric-teal/90 text-white text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-electric-teal transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                          <div className="text-electric-teal font-bold text-sm">
                            {metric.value}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link href={`/portfolio/${project.id}`}>
                      <Button
                        variant="ghost"
                        className="w-full justify-center hover:bg-electric-teal/10 hover:text-electric-teal transition-colors duration-200"
                      >
                        View Case Study
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="glass-morphism border-electric-teal/30 hover:border-electric-teal hover:bg-electric-teal/10 text-foreground font-semibold px-8 py-4 h-12 rounded-lg depth-1 hover:depth-2"
              >
                View All Projects
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
              How We Can Collaborate
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Partner with me to transform your engineering organization, optimize your 
              architecture, or accelerate your technical roadmap.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collaborationTypes.map((collab, index) => (
              <motion.div
                key={collab.title}
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
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{collab.icon}</div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-electric-teal transition-colors duration-200">
                      {collab.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {collab.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {collab.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm">
                        <div className="h-1.5 w-1.5 bg-electric-teal rounded-full mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full glass-morphism border-electric-teal/30 hover:border-electric-teal hover:bg-electric-teal/10 text-foreground transition-colors duration-200"
                  >
                    Learn More
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/collaborate">
              <Button
                size="lg"
                className="bg-electric-teal hover:bg-electric-teal/90 text-white font-semibold px-8 py-4 h-12 rounded-lg depth-2 hover:depth-3 card-hover-lift"
              >
                Start a Collaboration
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}