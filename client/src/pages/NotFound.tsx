import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(-1);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      p={3}
    >
      <Typography variant="h1" component="h1" fontSize="6rem" fontWeight="bold">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="error" onClick={handleGoHome}>
        Go Back
      </Button>
    </Box>
  );
};

export default NotFound;
