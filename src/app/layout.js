import { Inter } from "next/font/google"; // Import Inter font from Google Fonts
import "./globals.css";
import QueryProvider from "./QueryProvider";

// Importing Inter font with the variable class for easy styling
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
    <html lang="en">
      <body className={inter.variable}>
        {" "}
        {/* Apply the Inter font */}
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
