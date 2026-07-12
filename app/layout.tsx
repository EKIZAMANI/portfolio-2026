import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "M. Zaki Zamani",
  description: "Informatics graduate focused on web development, UI/UX design, and digital products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        
        {/* GoatCounter Analytics Script */}
        <Script 
          src="//gc.zgo.at/count.js" 
          data-goatcounter="https://nuravat.goatcounter.com/count" 
          strategy="afterInteractive" 
        />
      </body>
    </html>
  );
}