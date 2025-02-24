import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loading from "./components/common/Loading";
import { useSelector } from "react-redux";
import { RootState } from "./rtk/store";
import { useMyProfileQuery } from "./rtk/service";
const Home = lazy(() => import("./pages/Protected/Home"));
const ProfileLayout = lazy(
  () => import("./pages/Protected/profile/ProfileLayout")
);
const Threads = lazy(() => import("./pages/Protected/profile/Threads"));
const Repost = lazy(() => import("./pages/Protected/profile/Repost"));
const Replies = lazy(() => import("./pages/Protected/profile/Replies"));
const Search = lazy(() => import("./pages/Protected/Search"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
import Layout from "./pages/Protected/Layout";
const SinglePost = lazy(() => import("./components/posts/SinglePost"));

const App: React.FC = () => {
  //@ts-ignore
  const { darkMode, myProfile } = useSelector(
    ({ service }: RootState) => service
  );
  // @ts-ignore
  const { data, isError } = useMyProfileQuery('');

  const theme = createTheme({
    typography: {
      fontFamily: "Arial, sans-serif", // Set the global font family
      h1: {
        fontFamily: "Roboto,Georgia, serif", // Specific font for h1
        fontWeight: 700,
        fontSize: "2.5rem",
      },
      body1: {
        fontFamily: "Roboto,Verdana, sans-serif", // Specific font for body text
      },

      // Customize other variants as needed
    },
  });

  darkMode
    ? document.body.classList.add("bg-black")
    : document.body.classList.remove("bg-black");

  if (isError || !data) {
    return (
      <Suspense fallback={<Loading />}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Suspense>
    );
  }
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="" element={<Home />} />
                <Route path="post/:id" element={<SinglePost />} />
                <Route path="search" element={<Search />} />
                <Route path="profile" element={<ProfileLayout />}>
                  <Route path="threads/:id" element={<Threads />} />
                  <Route path="replies/:id" element={<Replies />} />
                  <Route path="reposts/:id" element={<Repost />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Suspense>
    </>
  );
};
export default App;
