"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchArticle } from "@/lib/api";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Alert,
} from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getValidImageUrl, fallback_image } from "@/utils/imageUtils";
import SnackbarComponent from "@/components/Snackbar.js";
import parse from "html-react-parser";

export default function Article() {
  const params = useParams();
  const [slug, setSlug] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isError, setIsError] = useState(false);

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

  useEffect(() => {
    if (article?.image) {
      setImageSrc(getValidImageUrl(article.image));
      setIsError(false);
    }
  }, [article]); // Run this only when article data is available

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setOpenSnackbar(true); // Show the Snackbar after copying the link
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close the Snackbar
  };

  const handleImageError = () => {
    console.log("Error loading image:", imageSrc);
    setIsError(true);
    setImageSrc(fallback_image);
  };

  if (!slug) return <div>Loading...</div>;
  if (isLoading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const validImageUrl = imageSrc || getValidImageUrl(article.image); // Use the validated image URL

  return (
    <div>
      <Breadcrumbs category={article.category} />
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
            {validImageUrl && (
              <Image
                width={800}
                height={600}
                src={validImageUrl} // Use the validated image URL
                alt={article.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                loading="eager"
                priority
                onError={handleImageError}
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
              onClick={handleShareClick} // Trigger copy link action
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
            {parse(article.content)}
          </Typography>
        </CardContent>

        {/* Snackbar for Toast message */}
        <SnackbarComponent
          open={openSnackbar}
          onClose={handleCloseSnackbar}
          message={"Share link copied to your clipboard."}
          severity={"success"}
        />
      </Box>
    </div>
  );
}
