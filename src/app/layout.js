import Footer from "@/components/Footer.js";
import Navbar from "@/components/Navbar.js";
import { Inter } from "next/font/google";
import "../../dist/output.css";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics.js";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "TLDevR",
  description: "TLDevR - quick tech articles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Analytics */}
        <GoogleAnalytics />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <QueryProvider>{children}</QueryProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
