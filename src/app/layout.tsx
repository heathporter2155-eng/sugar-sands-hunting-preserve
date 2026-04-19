import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sugar Sands Hunting Preserve | Private Hunting Club in South Walton, FL",
  description:
    "Sugar Sands Hunting Preserve — a private hunting club on a managed pine plantation in Watersound, South Walton, Florida. Deer hunting, turkey hunting, bear hunting, and wildlife management. Members-only preserve est. 1999. Walton County's premier hunting preserve near Destin, 30A, and Freeport.",
  keywords:
    "Sugar Sands, Sugar Sands Hunting Preserve, sugar sands hunting, hunting club Florida, private hunting club, Watersound FL hunting, South Walton hunting, hunting South Walton, Walton County hunting club, deer hunting Florida, turkey hunting Florida, bear hunting Florida, pine plantation hunting, hunting preserve Florida, hunting club near Destin, hunting club near 30A, hunting near Panama City Beach, Florida hunting lease, private hunting land Florida, wildlife management Florida, hunting club Panhandle, NW Florida hunting, hunting Freeport FL, hunting Defuniak Springs, Emerald Coast hunting, hunting club Walton County, private hunting preserve Florida, South Walton hunting club, hunting Watersound FL, Florida panhandle hunting club, hunting near Seaside FL, hunting near Santa Rosa Beach",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Sugar Sands Hunting Preserve | Private Hunting Club in South Walton, FL",
    description:
      "Sugar Sands Hunting Preserve — a private hunting club on a managed pine plantation in South Walton, Florida. Deer, turkey, and bear hunting. Wildlife stewardship since 1999.",
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
  alternateName: "Sugar Sands",
  description:
    "Sugar Sands Hunting Preserve is a private hunting club on a managed pine plantation in South Walton, Florida. Offering deer hunting, turkey hunting, bear hunting, and wildlife management since 1999. Located in Watersound, Walton County, near Destin, 30A, Freeport, and Panama City Beach.",
  url: "https://sugarsandshuntingpreserve.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Watersound",
    addressRegion: "FL",
    postalCode: "32461",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 30.38,
    longitude: -86.02,
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Walton County, FL" },
    { "@type": "AdministrativeArea", name: "South Walton, FL" },
    { "@type": "AdministrativeArea", name: "Emerald Coast, FL" },
  ],
  sport: "Hunting",
  foundingDate: "1999",
  keywords: "Sugar Sands, Sugar Sands Hunting Preserve, hunting club, hunting preserve, deer hunting, turkey hunting, bear hunting, pine plantation, private hunting club, South Walton, Watersound FL, Florida hunting, hunting South Walton, South Walton hunting, Walton County hunting, hunting near Destin, hunting near 30A, Freeport FL hunting",
  sameAs: [],
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
