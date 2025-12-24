import Footer from "@/components/Footer.js";
import Navbar from "@/components/Navbar.js";
import ThemeRegistry from "@/components/ThemeRegistry";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics.js";
import { Box } from "@mui/material";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "TLDevR",
  description: "Quick dev articles for busy devs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Analytics */}
        <GoogleAnalytics />
      </head>
      <body>
        <ThemeRegistry>
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, paddingTop: "4rem" }}>
              <QueryProvider>{children}</QueryProvider>
            </Box>
            <Footer />
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
