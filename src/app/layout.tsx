/* Gabriel Xavier — https://www.linkedin.com/in/gabrielxp/ */
import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Eixo | Realize seus Sonhos",
    template: "%s | Eixo",
  },
  description: "Com a Eixo, você conquista o que deseja de forma planejada, segura e sem juros. Consórcios de imóveis, automóveis e muito mais em Brasília - DF.",
  keywords: [
    "consórcio",
    "consórcio de imóveis",
    "consórcio de automóveis",
    "consórcio de veículos",
    "consórcio Brasília",
    "consórcio DF",
    "sem juros",
    "planejamento financeiro",
    "carta de crédito",
    "contemplação",
    "Eixo",
  ],
  authors: [{ name: "Eixo", url: "https://eixoconsorcios.com.br" }],
  creator: "Eixo",
  publisher: "Eixo",
  metadataBase: new URL("https://eixoconsorcios.com.br"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Eixo | Realize seus Sonhos",
    description: "Com a Eixo, você conquista o que deseja de forma planejada, segura e sem juros. Imóveis, automóveis e muito mais.",
    url: "https://eixoconsorcios.com.br",
    siteName: "Eixo",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Eixo - Realize seus Sonhos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eixo | Realize seus Sonhos",
    description: "Com a Eixo, você conquista o que deseja de forma planejada, segura e sem juros.",
    images: ["/og-image.jpg"],
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
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
