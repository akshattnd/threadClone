import {
  Box,
  TextField,
  Stack,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

const TextFieldBlack = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "1rem",
    "&.Mui-focused fieldset": {
      borderColor: "black",
    },
  },
  "& .MuiInputLabel-root": {
    "&.Mui-focused": {
      color: "black",
    },
  },
};
interface User {
  username?: string;
  email: string;
  password: string | number;
}
const SingUp: React.FC = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  const [login, setLogin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string | number>("");
  const toggleLogin = () => {
    setLogin((p) => !p);
    setPassword("");
    setEmail("");
    setUsername("");
  };

  const handleSubmit = () => {
    const user: User = login
      ? { email, password }
      : { username, email, password };
    console.log(user);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        height="100vh"
        textAlign="center"
        p={3}
        sx={{
          backgroundImage: `url(/register-bg.webp)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: _700 ? "100% 20rem" : "100% 12rem",
          objectFit: "cover",
        }}
      >
        <Stack
          flexDirection={"column"}
          width={_700 ? "35%" : "90%"}
          gap={2}
          mt={_700 ? "20" : "0"}
        >
          <Typography
            variant="h5"
            color={"GrayText"}
            fontSize={_700 ? "1.5rem" : "1rem"}
          >
            {login ? "Log In With Your Account" : "Register Your  Account"}
          </Typography>
          {!login && (
            <TextField
              id="outlined-basic"
              placeholder={"username"}
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              sx={TextFieldBlack}
            />
          )}

          <TextField
            id="outlined-basic"
            placeholder={"email"}
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            sx={TextFieldBlack}
          />
          <TextField
            id="outlined-basic"
            placeholder="enter your password"
            variant="outlined"
            value={password}
            fullWidth
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            sx={TextFieldBlack}
          />
          <Button
            size={"large"}
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "white",
              color: "gray",
              ":hover": { color: "black" },
              borderRadius: ".8rem",
            }}
            fullWidth
          >
            {login ? "Login" : "Sign Up"}
          </Button>
          <Typography
            variant="subtitle2"
            fontSize={_700 ? "1.3rem" : "1rem"}
            alignSelf={"center"}
            mt={_700 ? 1 : 0}
            color="GrayText"
          >
            {login ? "Don't have an account" : "Already have an accout ?"}
            <Button
              onClick={() => {
                toggleLogin();
              }}
              sx={{
                paddingLeft: "0.5",
              }}
            >
              <Typography variant="subtitle1">
                {login ? " Sign up" : " Login"}
              </Typography>
            </Button>
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default SingUp;
