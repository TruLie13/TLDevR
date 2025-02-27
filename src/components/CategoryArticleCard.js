import { Card, Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { getValidImageUrl, fallback_image } from "@/utils/imageUtils";

export default function CategoryArticleCard({ article, height, categorySlug }) {
  return (
    <Link href={`/blog/${categorySlug}/${article.slug}`} passHref>
      <Card
        className="zoom-image"
        sx={{
          borderRadius: "1.5rem",
          overflow: "hidden",
          backgroundColor: "rgb(8, 4, 31)",
          position: "relative",
          width: "100%",
          height,
          cursor: "pointer",
        }}
      >
        <Image
          src={getValidImageUrl(article.image) || fallback_image}
          alt={article.title}
          layout="fill"
          objectFit="cover"
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            color: "white",
            padding: "0.5rem",
            textAlign: "center",
            backgroundColor: "rgba(19, 13, 48, 0.75)",
          }}
        >
          <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
            {article.title}
          </Typography>
        </Box>
      </Card>
    </Link>
  );
}
