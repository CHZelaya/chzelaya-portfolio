import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, Cormorant_Garamond, Caveat, Nunito, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string)

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const nunito = Nunito({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});






export const metadata: Metadata = {
  title: "betonotfound",
  description: "Developer & Photographer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(bebas.variable, jetbrains.variable, cormorant.variable, caveat.variable, nunito.variable, "font-sans", inter.variable)}>
      <body>
        <ClerkProvider>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </body>
    </html>
  );
}
