"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchArticle } from "@/lib/api";
import { useEffect, useState } from "react";
import Image from "next/image.js";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";

export default function Article() {
  const params = useParams();
  const [slug, setSlug] = useState(null);

  useEffect(() => {
    if (params?.slug) {
      setSlug(params.slug);
    }
  }, [params]);

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticle(slug),
    enabled: !!slug,
  });

  if (!slug) return <div>Loading...</div>;
  if (isLoading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "1rem",
      }}
    >
      {/* Image Card */}
      <Box sx={{ position: "relative", width: "100%" }}>
        <Card
          sx={{
            width: "100%",
            height: { xs: "35vh", sm: "35vh" },
            borderRadius: "1.5rem",
            overflow: "hidden",
            backgroundColor: "rgb(8, 4, 31)",
          }}
        >
          {article.image && (
            <Image
              width={800}
              height={600}
              src={article.image}
              alt={article.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              loading="eager"
              priority
            />
          )}
        </Card>

        {/* Floating Action Buttons */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-25px", // Moves the button half outside the card
            right: "5%", // Positions it about 70% across the width
            display: "flex",
            gap: "10px",
            zIndex: 10, // Keeps buttons above other elements
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.9)" },
            }}
          >
            <Share />
          </IconButton>
          <IconButton
            sx={{
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "white",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.9)" },
            }}
          >
            <Favorite />
          </IconButton>
        </Box>
      </Box>

      {/* Article Content */}
      <CardContent sx={{ textAlign: "left", width: "100%", mt: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "white" }}
        >
          {article.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "rgba(255,255,255,0.8)", textAlign: "justify" }}
        >
          {article.content}
        </Typography>
      </CardContent>
    </Box>
  );
}
