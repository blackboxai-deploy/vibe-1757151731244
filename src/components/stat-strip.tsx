"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Stat } from "@/types";

const stats: Stat[] = [
  {
    label: "Years Experience",
    value: "12+",
    description: "Leading complex engineering initiatives"
  },
  {
    label: "Teams Led",
    value: "25+",
    description: "High-performing engineering teams"
  },
  {
    label: "System Uptime",
    value: "99.99%",
    description: "Resilient infrastructure delivery"
  },
  {
    label: "Projects Delivered",
    value: "50+",
    description: "Enterprise-grade solutions"
  },
  {
    label: "Cost Reduction",
    value: "$2.5M+",
    description: "Through optimization initiatives"
  }
];

interface AnimatedCounterProps {
  target: string;
  duration?: number;
  inView: boolean;
}

function AnimatedCounter({ target, duration = 2000, inView }: AnimatedCounterProps) {
  const [count, setCount] = useState("0");
  
  useEffect(() => {
    if (!inView) return;

    // Extract numeric part from target (e.g., "12+" -> "12", "$2.5M+" -> "2.5")
    const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) {
      setCount(target);
      return;
    }

    let start = 0;
    const increment = numericValue / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericValue) {
        setCount(target);
        clearInterval(timer);
      } else {
        // Format the number based on the original target format
        let formattedValue = start.toString();
        
        if (target.includes('M')) {
          formattedValue = (start).toFixed(1) + 'M';
        } else if (target.includes('.')) {
          formattedValue = start.toFixed(2);
        } else {
          formattedValue = Math.floor(start).toString();
        }
        
        // Add prefix/suffix from original target
        if (target.startsWith('$')) formattedValue = '$' + formattedValue;
        if (target.endsWith('+')) formattedValue = formattedValue + '+';
        if (target.endsWith('%')) formattedValue = formattedValue + '%';
        
        setCount(formattedValue);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, inView]);

  return <span>{count}</span>;
}

interface StatCardProps {
  stat: Stat;
  index: number;
  inView: any;
}

function StatCard({ stat, index, inView }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="group relative"
    >
      <div className="relative p-6 lg:p-8 glass-morphism depth-1 hover:depth-3 card-hover-lift rounded-lg border border-white/10 hover:border-electric-teal/30 transition-all duration-300">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-electric-teal/5 via-transparent to-deep-indigo/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 text-center">
          {/* Value */}
          <motion.div
            className="text-3xl lg:text-4xl font-display font-bold text-electric-teal mb-2"
            initial={{ scale: 0.5 }}
            animate={inView ? { scale: 1 } : { scale: 0.5 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.2,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            <AnimatedCounter target={stat.value} inView={inView} />
          </motion.div>
          
          {/* Label */}
          <h3 className="text-lg font-display font-semibold text-foreground mb-1">
            {stat.label}
          </h3>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {stat.description}
          </p>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-electric-teal rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}

export function StatStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
            Proven Track Record
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Over a decade of transforming engineering organizations and 
            delivering measurable business impact through technical excellence.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              stat={stat}
              index={index}
              inView={isInView}
            />
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 h-0.5 bg-gradient-to-r from-transparent via-electric-teal to-transparent max-w-md mx-auto"
        />
      </div>
    </section>
  );
}