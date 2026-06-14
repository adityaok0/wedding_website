import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/context/MusicContext";
import { MuteButton } from "@/components/MuteButton";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import { BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "Aditya & Sarayu - Wedding Invitation",
  description: "Join us in celebrating the wedding of Aditya & Sarayu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (    
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-screen bg-ivory text-deep-forest overflow-x-hidden font-sans flex flex-col">
         <MusicProvider>
        {children}
        <MuteButton /> 
        </MusicProvider>  
        <BottomNav />
      </body>
    </html>
  );
}
