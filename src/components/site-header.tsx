"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  label: string;
  href: string;
  description?: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", description: "Back to homepage" },
  { label: "About", href: "/about", description: "Leadership & experience" },
  { label: "Portfolio", href: "/portfolio", description: "Featured projects" },
  { label: "Collaborate", href: "/collaborate", description: "Work together" },
  { label: "Contact", href: "/contact", description: "Get in touch" }
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-morphism depth-2 border-b border-white/10"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              className="h-8 w-8 lg:h-10 lg:w-10 bg-electric-teal rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-lg lg:text-xl">PE</span>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="font-display font-bold text-lg lg:text-xl text-foreground">
                Principal Engineer
              </h1>
              <p className="text-xs text-muted-foreground">
                Architecting the Future
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative group py-2"
              >
                <span className="text-sm font-medium text-foreground/80 group-hover:text-electric-teal transition-colors duration-200">
                  {item.label}
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-electric-teal"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-lg hover:bg-accent/50"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? (
                  <svg
                    className="h-4 w-4 text-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 text-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </motion.div>
            </Button>

            {/* CTA Button */}
            <Link href="/collaborate">
              <Button
                className="hidden sm:flex bg-electric-teal hover:bg-electric-teal/90 text-white font-medium px-6 py-2 h-10 rounded-lg depth-1 hover:depth-2 transition-all duration-200"
              >
                Let&apos;s Collaborate
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-9 w-9 rounded-lg"
                >
                  <motion.div
                    animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </motion.div>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="glass-morphism border-l border-white/10 w-80"
              >
                <div className="flex flex-col space-y-6 pt-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block group"
                      >
                        <div className="flex flex-col space-y-1 p-3 rounded-lg hover:bg-accent/5 transition-colors">
                          <span className="font-medium text-foreground">
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="text-sm text-muted-foreground">
                              {item.description}
                            </span>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                  
                  <div className="pt-6 border-t border-border">
                    <Link href="/collaborate">
                      <Button
                        className="w-full bg-electric-teal hover:bg-electric-teal/90 text-white font-medium py-3 h-12 rounded-lg depth-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Let&apos;s Collaborate
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}