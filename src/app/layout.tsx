import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sugar Sands Hunting Preserve | South Walton County, FL",
  description:
    "An exclusive private hunting club on a pine plantation in South Walton County, Florida. Where the love of the outdoors, family, and stewardship come together.",
  keywords:
    "hunting club, hunting preserve, South Walton County, Florida hunting, pine plantation, deer hunting, turkey hunting, private hunting club",
  openGraph: {
    title: "Sugar Sands Hunting Preserve",
    description:
      "An exclusive private hunting club on a pine plantation in South Walton County, Florida.",
    url: "https://sugarsandshuntingpreserve.com",
    siteName: "Sugar Sands Hunting Preserve",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
