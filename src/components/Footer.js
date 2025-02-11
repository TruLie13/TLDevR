import React from "react";
import { Typography, Box } from "@mui/material";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full h-20 bg-black flex items-center justify-center relative">
      <Box className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-70 z-10"></Box>

      <div className="text-center z-20 text-white font-light flex justify-center items-center flex-wrap gap-2 text-sm sm:text-base md:text-lg">
        <Typography component="span">
          <Link
            href="https://pi-que.com"
            className="text-white group"
            target="_blank"
          >
            Created by{" "}
            <span className="text-white group-hover:text-red-500 transition-colors duration-300">
              pi.que llc
            </span>{" "}
            © 2025.
          </Link>
        </Typography>
        <Typography component="span" className="whitespace-nowrap">
          All rights reserved
        </Typography>
      </div>

      {/* Subtle Geometric Background */}
      <Box className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute w-20 h-20 rounded-full bg-opacity-30 bg-white left-1/4 bottom-0"></div>
        <div className="absolute w-16 h-16 rounded-full bg-opacity-20 bg-white left-3/4 bottom-0"></div>
      </Box>
    </div>
  );
}
