import { Stack, Button, useMediaQuery } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import React from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { toggleMainMenu } from "../../rtk/slice";
import { RootState } from "../../rtk/store";

const Header: React.FC = () => {
  const isLargeScreen = useMediaQuery("(min-width:700px)");
  const dispatch = useDispatch();
  const { darkMode } = useSelector(({ service }: RootState) => service);

  return (
    <>
      <Stack
        flexDirection="row"
        width="100%"
        justifyContent={isLargeScreen ? "space-around" : "space-between"}
        alignItems="center"
        position="sticky"
        top={0}
        py={1}
        px={isLargeScreen ? 2 : 0}
        bgcolor={darkMode ? "black" : "white"}
        zIndex={10}
        color={darkMode ? "white" : "black"}
        boxShadow="0px 2px 5px rgba(0, 0, 0, 0.1)"
      >
        <img
          src={
            darkMode
              ? "/Threads-logo-black-bg.webp"
              : "/Threads-logo-white-bg.png"
          }
          alt="Logo"
          style={{
            width: isLargeScreen
              ? darkMode
                ? "3.5rem"
                : "4rem"
              : darkMode
              ? "3rem"
              : "2.5rem",
            height: isLargeScreen ? "3rem" : "2rem",
            marginLeft: ".5rem",
          }}
        />
        {isLargeScreen ? (
          <Stack
            flexDirection="row"
            width="34rem"
            height="4rem"
            justifyContent="space-around"
            alignItems="center"
            p={1}
            bgcolor={darkMode ? "black" : "white"}
            borderRadius="8px"
          >
            <Navbar />
          </Stack>
        ) : (
          <Stack
            flexDirection="row"
            width="100%"
            height="4rem"
            justifyContent="space-between"
            alignItems="center"
            position="fixed"
            bottom={0}
            bgcolor={darkMode ? "black" : "white"}
            zIndex={10}
            boxShadow="0px -2px 5px rgba(0, 0, 0, 0.1)"
          >
            <Navbar />
          </Stack>
        )}

        <Button
          color="inherit"
          size="large"
          onClick={(e) => {
            dispatch(toggleMainMenu(e.currentTarget));
          }}
          sx={{
            ":hover": {
              backgroundColor: darkMode ? "#616161" : "#e0e0e0",
            },
          }}
        >
          <MenuOutlined fontSize="large" />
        </Button>
      </Stack>
    </>
  );
};

export default Header;
