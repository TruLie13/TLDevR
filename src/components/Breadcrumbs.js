import HomeIcon from "@mui/icons-material/Home";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Breadcrumbs = ({ categoryName, categorySlug }) => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleCategoryClick = () => {
    router.push(`/blog/${categorySlug}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "800px",
        margin: "0 auto",
        marginTop: ".25rem",
        padding: "0 1rem",
        width: "100%",
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: "100%",
          backgroundColor: "rgba(71, 49, 184, 0)",
          paddingBottom: "0",
          display: "flex",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <IconButton
          sx={{
            color: "white",
            padding: "0",
          }}
          onClick={handleHomeClick}
          aria-label="Go to Homepage"
        >
          <HomeIcon sx={{ fontSize: 22 }} />
        </IconButton>

        <ChevronRightIcon sx={{ color: "white", mx: ".25rem" }} />

        <Typography variant="body1" sx={{ color: "white" }}>
          <span style={{ cursor: "pointer" }} onClick={handleCategoryClick}>
            {categoryName?.toUpperCase()}
          </span>
        </Typography>
      </Card>
    </Box>
  );
};

export default Breadcrumbs;
