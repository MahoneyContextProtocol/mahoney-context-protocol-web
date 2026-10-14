import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/Navbar";
import { WebMCPRuntimeProvider } from "@/components/WebMCPRuntimeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahoney Context Protocol (mahoneycontextprotocol.com) — 27 Protocols · 40 Regulated Vertical Tools",
  description:
    "Commercial Agentic Web Platform & Business WebMCP Studio: 27 mcp-foundation v2.0 discovery, identity, commerce, payment, and UI protocols + 40 regulated industry tools + 7 business journey packs.",
  metadataBase: new URL("https://mahoneycontextprotocol.com"),
  alternates: {
    canonical: "https://mahoneycontextprotocol.com",
    types: {
      "text/markdown": "https://mahoneycontextprotocol.com/llms-full.txt",
      "application/linkset+json": "https://mahoneycontextprotocol.com/.well-known/api-catalog",
    },
  },
};

const JSON_LD_GRAPH = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://mahoneycontextprotocol.com/#website",
      url: "https://mahoneycontextprotocol.com",
      name: "Mahoney Context Protocol",
      description:
        "Commercial Agentic Web Platform unifying 27 protocols, 40 regulated vertical WebMCP tools, and 7 business journey packs.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://mahoneycontextprotocol.com/#software",
      name: "Mahoney Context Protocol Studio & Foundation v2.0",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web, Cloudflare Workers, Node.js, Browser navigator.modelContext",
      offers: [
        {
          "@type": "Offer",
          name: "Open Source Free",
          price: "0",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Pro Business",
          price: "49",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Regulated Enterprise",
          price: "299",
          priceCurrency: "USD",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <head>
        <link rel="api-catalog" href="/.well-known/api-catalog" type="application/linkset+json" />
        <link rel="service-desc" href="/.well-known/openapi.json" type="application/json" />
        <link rel="mcp-server" href="/.well-known/mcp.json" type="application/json" />
        <link rel="agent-card" href="/.well-known/agent-card.json" type="application/json" />
        <link rel="author" href="/humans.txt" type="text/plain" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_GRAPH) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WebMCPRuntimeProvider />
      </body>
    </html>
  );
}
