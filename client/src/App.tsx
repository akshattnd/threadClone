import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
const Layout = lazy(() => import("./pages/Protected/Layout"));
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
  const router = createBrowserRouter([
    {
      path: "/",

      element: (!isError && data) ? <Layout /> : <Login />,

      children: (!isError && data)
        ? [
          { index: true, element: <Home /> },
          { path: "search", element: <Search /> },
          {
            path: "profile/:id",
            element: <ProfileLayout />,
            children: [
              { index: true, element: <Threads /> },
              { path: "post/:id", element: <SinglePost /> },
              { path: "repost/:id", element: <Repost /> },
              { path: "replies/:id", element: <Replies /> },
            ],
          },
        ]
        : [],
    },
    { path: "*", element: <NotFound /> },
  ]);
  darkMode
    ? document.body.classList.add("bg-black")
    : document.body.classList.remove("bg-black");

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Suspense>
    </>
  );
};
export default App;
