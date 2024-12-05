import { Outlet } from "react-router-dom";
import React from "react";
import { Stack, useMediaQuery } from "@mui/material";
import Header from "../../components/common/Header";
import AddPost from "../../components/model/AddPost";
import EditProfile from "../../components/model/EditProfile";
import MainMenu from "../../components/menu/MainMenu";
import MyMenu from "../../components/menu/MyMenu";
const Layout: React.FC = () => {
  const _700 = useMediaQuery("(min-width:700px)");
  return (
    <Stack
      flexDirection={"column"}
      maxWidth={_700 ? "800px" : "90%"}
      mx={"auto"}
      minWidth={"100%"}
      overflow={"hidden"}
    >
      <Header />
      <AddPost />
      <EditProfile />
      <MainMenu />
      <MyMenu />
      <Outlet />
    </Stack>
  );
};

export default Layout;
