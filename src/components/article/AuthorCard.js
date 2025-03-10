import Image from "next/image";
import { Box, Typography, IconButton, Card, CardContent } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const AuthorCard = () => {
  const author = {
    title: "About The Author",
    bio: "Jonathan Zayan is a software engineer and founder of pi.que LLC, focused on launching innovative apps like TLDevr, a resource hub for early-career developers. With experience as a software engineer at Caesars Sportsbook and as a co-founder of Geminus Dev, Jonathan is dedicated to bridging knowledge gaps in tech and supporting the developer community.",
    image:
      "https://media.licdn.com/dms/image/v2/C5603AQHcbfvi7BEOUQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1652293183860?e=1747267200&v=beta&t=HxfT6lNrTKpPrAzoHnDuCNKyVyLR5pM-REvihjiKNQM",
    linkedin: "https://www.linkedin.com/in/jzayan/",
    github: "https://www.github.com/TruLie13",
  };

  return (
    <Card
      sx={{
        p: 1,
        pb: 0,
        mt: 4,
        boxShadow: 3,
        backgroundColor: "rgb(21, 18, 43)",
        borderRadius: "24px",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent sx={{ width: "100%", marginTop: 1 }}>
        <Typography variant="h7" fontWeight={"bold"} textAlign="center">
          {author.title}
        </Typography>
        <Typography
          variant="body2"
          textAlign="justify"
          sx={{ mt: 2, fontSize: "0.8rem" }}
        >
          {author.bio}
        </Typography>
        <Box display="flex" justifyContent="center" gap={1} mt={2}>
          <IconButton
            // component="a"
            href={author.linkedin}
            target="_blank"
            sx={{ color: "white" }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            // component="a"
            href={author.github}
            target="_blank"
            sx={{ color: "white" }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AuthorCard;
