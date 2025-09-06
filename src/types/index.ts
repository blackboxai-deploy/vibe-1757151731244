// Core portfolio types and interfaces

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: ProjectCategory;
  role: string;
  duration: string;
  teamSize: string;
  metrics: ProjectMetric[];
  architecture: {
    problem: string;
    approach: string;
    solution: string;
    impact: string;
    techStack: string[];
  };
  featured: boolean;
  year: number;
}

export interface ProjectMetric {
  label: string;
  value: string;
  description: string;
}

export type ProjectCategory = 
  | 'infrastructure' 
  | 'architecture' 
  | 'leadership' 
  | 'consulting'
  | 'product';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  logo?: string;
  image?: string;
}

export interface Stat {
  label: string;
  value: string;
  description?: string;
  icon?: string;
}

export interface CollaborationType {
  id: string;
  title: string;
  description: string;
  features: string[];
  estimatedDuration: string;
  budgetRange: string;
  icon?: string;
}

export interface CollaborationFormData {
  fullName: string;
  email: string;
  organization?: string;
  collabType: CollaborationType['id'] | 'other';
  budgetRange?: BudgetRange;
  timeline?: string;
  message: string;
  attachment?: File;
  // UTM tracking fields
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export type BudgetRange = 
  | '<$5k' 
  | '$5k-$25k' 
  | '$25k-$100k' 
  | '>$100k';

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  organization?: string;
  phone?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  featured: boolean;
}

export interface SpeakingEngagement {
  id: string;
  title: string;
  event: string;
  date: string;
  location: string;
  description: string;
  videoUrl?: string;
  slidesUrl?: string;
  tags: string[];
}

export interface Recognition {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  link?: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

// Animation and UI types
export interface AnimationConfig {
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
}

export interface ThreeJSConfig {
  enableParallax: boolean;
  enableBloom: boolean;
  fallbackToSVG: boolean;
  particleCount: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  nextSteps?: {
    calendlyUrl?: string;
    followUpEmail?: boolean;
  };
}

// SEO and Meta types
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  noIndex?: boolean;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

// Theme and styling types
export interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  accentColor: string;
  reducedMotion: boolean;
}