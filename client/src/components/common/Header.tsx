import { Stack, Button, useMediaQuery } from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";
import React from "react";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <>
      <Stack
        flexDirection={"row"}
        width={"100%"}
        justifyContent={_700 ? "space-around" : "space-between"}
        alignItems={"center"}
        position={"sticky"}
        top={0}
        py={1}
        px={_700 ? 2 : 0}
      >
        <img
          src="/Threads-logo-black-bg.webp"
          alt="Logo"
          className="w-14 h-12"
        />
        {_700 ? (
          <Stack
            flexDirection={"row"}
            width={"34rem"}
            height={"4rem"}
            justifyContent={"space-around"}
            alignItems={"center"}
            p={1}
            zIndex={2}
            bgcolor={"aliceblue"}
          >
            <Navbar />
          </Stack>
        ) : (
          <Stack
            flexDirection={"row"}
            width={"100%"}
            height={"4rem"}
            justifyContent={"space-between"}
            alignItems={"center"}
            zIndex={2}
            position={"fixed"}
            bottom={0}
          >
            <Navbar />
          </Stack>
        )}

        <Button color="inherit" size="large">
          <MenuOutlined fontSize={"large"} />
        </Button>
      </Stack>
    </>
  );
};

export default Header;
