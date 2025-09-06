import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Principal Engineer - Architecting Resilient Systems",
    template: "%s | Principal Engineer"
  },
  description: "Principal Engineer specializing in architecting resilient systems, mentoring engineering teams, and delivering product-grade infrastructure. Transform your technical challenges into scalable solutions.",
  keywords: [
    "Principal Engineer",
    "Software Architecture",
    "Technical Leadership", 
    "System Design",
    "Infrastructure Engineering",
    "Engineering Management",
    "Scalable Systems",
    "Technical Consulting"
  ],
  authors: [{ name: "Principal Engineer" }],
  creator: "Principal Engineer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://principal-engineer.com",
    title: "Principal Engineer - Architecting Resilient Systems",
    description: "Principal Engineer specializing in architecting resilient systems, mentoring engineering teams, and delivering product-grade infrastructure.",
    siteName: "Principal Engineer",
    images: [
      {
        url: "https://placehold.co/1200x630?text=Principal+Engineer+-+Architecting+Resilient+Systems",
        width: 1200,
        height: 630,
        alt: "Principal Engineer - Architecting Resilient Systems",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Principal Engineer - Architecting Resilient Systems",
    description: "Principal Engineer specializing in architecting resilient systems, mentoring engineering teams, and delivering product-grade infrastructure.",
    images: ["https://placehold.co/1200x630?text=Principal+Engineer+-+Architecting+Resilient+Systems"],
    creator: "@principal_eng",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 pt-16 lg:pt-20">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Principal Engineer",
              "description": "Principal Engineer specializing in architecting resilient systems, mentoring engineering teams, and delivering product-grade infrastructure.",
              "url": "https://principal-engineer.com",
              "telephone": "+1-555-ENGINEER",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "San Francisco",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 37.7749,
                "longitude": -122.4194
              },
              "sameAs": [
                "https://linkedin.com/in/principal-engineer",
                "https://github.com/principal-engineer",
                "https://twitter.com/principal_eng"
              ],
              "serviceType": [
                "Software Architecture",
                "Technical Leadership",
                "System Design",
                "Infrastructure Consulting",
                "Engineering Management"
              ],
              "areaServed": "Global"
            }),
          }}
        />
      </body>
    </html>
  );
}