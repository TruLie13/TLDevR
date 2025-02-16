import HomeIcon from "@mui/icons-material/Home";
import { Box, Card, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Breadcrumbs = ({ category }) => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleCategoryClick = () => {
    router.push(`/blog/${category}`);
  };

  const Divider = () => (
    <Typography
      variant="body2"
      sx={{
        color: "white",
        margin: "1rem 1rem",
        marginBottom: "1rem",
        paddingBottom: ".2rem",
        backgroundColor: "transparent",
        border: "none",
      }}
    >
      &gt;
    </Typography>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "800px",
        margin: "0 auto",
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
        >
          <HomeIcon />
        </IconButton>
        <Divider />
        <Typography variant="body1" sx={{ color: "white" }}>
          <span style={{ cursor: "pointer" }} onClick={handleCategoryClick}>
            {category?.toUpperCase()}
          </span>
        </Typography>
      </Card>
    </Box>
  );
};

export default Breadcrumbs;
