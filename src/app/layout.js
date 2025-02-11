import { Inter } from "next/font/google";
import "./globals.css";
import "../../dist/output.css";
import QueryProvider from "./QueryProvider";
import Navbar from "@/components/Navbar.js";
import Footer from "@/components/Footer.js";

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
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <QueryProvider>{children}</QueryProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
