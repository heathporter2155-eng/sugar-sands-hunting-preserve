import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sugar Sands Hunting Preserve | Private Hunting Club in Watersound, FL",
  description:
    "Sugar Sands Hunting Preserve is a private hunting club in Watersound, South Walton, Florida. Deer hunting, turkey hunting, and wildlife management on a managed pine plantation. Est. 1999.",
  keywords:
    "Sugar Sands Hunting Preserve, hunting club Florida, private hunting club, Watersound FL hunting, South Walton hunting, Walton County hunting club, deer hunting Florida, turkey hunting Florida, pine plantation hunting, hunting preserve Florida, hunting club near Destin, hunting club near 30A, hunting near Panama City Beach, Florida hunting lease, private hunting land Florida, wildlife management Florida, hunting club Panhandle, NW Florida hunting, hunting Freeport FL, hunting Defuniak Springs, Emerald Coast hunting",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Sugar Sands Hunting Preserve | Private Hunting Club in Watersound, FL",
    description:
      "A private hunting club on a managed pine plantation in South Walton, Florida. Deer hunting, turkey hunting, and wildlife stewardship since 1999.",
    url: "https://sugarsandshuntingpreserve.com",
    siteName: "Sugar Sands Hunting Preserve",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://sugarsandshuntingpreserve.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Sugar Sands Hunting Preserve",
  description:
    "Sugar Sands Hunting Preserve is a private hunting club on a managed pine plantation in South Walton, Florida. Offering deer hunting, turkey hunting, and wildlife management since 1999.",
  url: "https://sugarsandshuntingpreserve.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Watersound",
    addressRegion: "FL",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.38,
    longitude: -86.02,
  },
  sport: "Hunting",
  foundingDate: "1999",
  keywords: "hunting club, hunting preserve, deer hunting, turkey hunting, pine plantation, private hunting club, South Walton, Watersound FL, Florida hunting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
