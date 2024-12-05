import {
  Box,
  TextField,
  Stack,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSigninMutation, useLoginMutation } from "../rtk/service";
const TextFieldBlack = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "white",
    borderRadius: "1rem",
    border: "1px solid white",
    "& fieldset": {
      borderColor: "gray", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "black", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "black", // Border color on focus
    },
  },
  "& .MuiInputLabel-root": {
    color: "gray", // Default label color
    "&.Mui-focused": {
      color: "black", // Label color on focus
    },
  },
};
const SignUp: React.FC = () => {
  const isLargeScreen = useMediaQuery("(min-width:700px)");
  const [login, setLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string | number>("");
  const [signinUser, signinUserDate] = useSigninMutation();
  const [loginUser, loginUserDate] = useLoginMutation();



  const toggleLogin = () => {
    setLogin((prev) => !prev);
    setPassword("");
    setEmail("");
    setUsername("");
  };
  const handleSubmit = async () => {
    login
      ? await loginUser({ password, email })
      : await signinUser({ username, password, email });

  };

  useEffect(() => {
    signinUserDate.isSuccess || loginUserDate.isSuccess
      ? console.log(
        signinUserDate.isSuccess ? signinUserDate.data : loginUserDate.data
      )
      : console.log(
        signinUserDate.isError ? signinUserDate.data : loginUserDate.data
      );
  }, [signinUserDate.isSuccess, loginUserDate.isSuccess]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      p={3}
      sx={{
        backgroundImage: `url(/register-bg.webp)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: isLargeScreen ? "100% 20rem" : "100% 12rem",
        objectFit: "cover",
      }}
    >
      <Stack
        flexDirection="column"
        width={isLargeScreen ? "45%" : "90%"}
        gap={3}
      >
        <Typography
          variant="h5"
          color="GrayText"
          fontSize={isLargeScreen ? "1.5rem" : "1rem"}
        >
          {login ? "Log In With Your Account" : "Register Your Account"}
        </Typography>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {!login && (
            <TextField
              id="username"
              placeholder="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={TextFieldBlack}
            />
          )}
          <TextField
            id="email"
            placeholder="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={TextFieldBlack}
          />
          <TextField
            id="password"
            placeholder="Enter your password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="false"
            sx={TextFieldBlack}
          />

          <Button
            type="submit"
            size="large"
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "gray",
              ":hover": { color: "black" },
              borderRadius: "0.8rem",
            }}
            fullWidth
          >
            {login ? "Login" : "Sign Up"}
          </Button>
        </form>

        <Typography
          variant="subtitle2"
          fontSize={isLargeScreen ? "1.3rem" : "1rem"}
          alignSelf="center"
          mt={1}
          color="GrayText"
        >
          {login ? "Don't have an account?" : "Already have an account?"}
          <Button
            onClick={toggleLogin}
            sx={{
              textTransform: "none",
              ml: 1,
            }}
          >
            <Typography variant="subtitle1" color="primary">
              {login ? "Sign Up" : "Login"}
            </Typography>
          </Button>
        </Typography>
      </Stack>
    </Box>
  );

};

export default SignUp;
