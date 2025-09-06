"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, MeshDistortMaterial } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// 3D Scene Component
function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Floating geometric shapes */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 2, -2]} rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshDistortMaterial
            color="#00D7C6"
            transparent
            opacity={0.6}
            distort={0.3}
            speed={2}
          />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[4, -1, -1]} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
          <octahedronGeometry args={[0.8]} />
          <MeshDistortMaterial
            color="#2A2D8F"
            transparent
            opacity={0.4}
            distort={0.4}
            speed={1.5}
          />
        </mesh>
      </Float>
      
      <Float speed={0.8} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[2, 3, -3]} rotation={[0, 0, Math.PI / 4]}>
          <tetrahedronGeometry args={[1.2]} />
          <MeshDistortMaterial
            color="#00D7C6"
            transparent
            opacity={0.3}
            distort={0.2}
            speed={3}
          />
        </mesh>
      </Float>
      
      {/* Subtle grid floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshBasicMaterial 
          color="#00D7C6" 
          transparent 
          opacity={0.1} 
          wireframe 
        />
      </mesh>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
}

// Fallback SVG background for low-powered devices
function SVGFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 215, 198, 0.1)" />
            <stop offset="100%" stopColor="rgba(42, 45, 143, 0.1)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg-gradient)" />
        
        {/* Floating geometric shapes */}
        <g className="animate-pulse">
          <polygon 
            points="150,100 200,150 150,200 100,150" 
            fill="rgba(0, 215, 198, 0.3)"
            className="animate-bounce"
          />
          <circle 
            cx="600" 
            cy="400" 
            r="40" 
            fill="rgba(42, 45, 143, 0.2)"
            className="animate-pulse"
          />
          <polygon 
            points="700,150 750,200 700,250 650,200" 
            fill="rgba(0, 215, 198, 0.2)"
            className="animate-bounce"
            style={{ animationDelay: '1s' }}
          />
        </g>
      </svg>
    </div>
  );
}

export function HeroBanner() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [use3D, setUse3D] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
    
    // Check for low-powered devices
    const isLowPowerDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    if (isLowPowerDevice) {
      setUse3D(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  if (!isLoaded) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-96 mb-4"></div>
          <div className="h-4 bg-muted rounded w-64"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* 3D Background */}
      <div className="absolute inset-0">
        {use3D ? (
          <Suspense fallback={<SVGFallback />}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              style={{ background: "transparent" }}
            >
              <HeroScene />
            </Canvas>
          </Suspense>
        ) : (
          <SVGFallback />
        )}
      </div>

      {/* Parallax overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-electric-teal/5 via-transparent to-deep-indigo/5"
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div 
                variants={itemVariants} 
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="flex justify-center"
              >
                <div className="inline-flex items-center px-6 py-3 rounded-full glass-morphism depth-1 border border-electric-teal/20">
                  <div className="h-2 w-2 bg-electric-teal rounded-full mr-3 animate-pulse"></div>
                  <span className="text-sm font-medium text-electric-teal">
                    Available for Technical Leadership Roles
                  </span>
                </div>
              </motion.div>

              {/* Main heading */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight"
              >
                <span className="block text-foreground mb-2">
                  Principal Engineer
                </span>
                <span className="block bg-gradient-to-r from-electric-teal via-deep-indigo to-electric-teal bg-clip-text text-transparent">
                  Architecting the Future
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                Transforming complex technical challenges into{" "}
                <span className="text-electric-teal font-semibold">scalable solutions</span>.
                Leading high-performing engineering teams and delivering{" "}
                <span className="text-deep-indigo font-semibold">enterprise-grade infrastructure</span>{" "}
                that drives business growth.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <Link href="/collaborate">
                  <Button
                    size="lg"
                    className="bg-electric-teal hover:bg-electric-teal/90 text-white font-semibold px-8 py-4 h-12 rounded-lg depth-2 hover:depth-3 card-hover-lift text-base"
                  >
                    Let&apos;s Collaborate
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
                
                <Link href="/portfolio">
                  <Button
                    variant="outline"
                    size="lg"
                    className="glass-morphism border-electric-teal/30 hover:border-electric-teal hover:bg-electric-teal/10 text-foreground font-semibold px-8 py-4 h-12 rounded-lg depth-1 hover:depth-2 card-hover-lift text-base"
                  >
                    View Portfolio
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
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-6 w-4 border-2 border-electric-teal/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1 h-1 bg-electric-teal rounded-full mt-1"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}