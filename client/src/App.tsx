import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Home = lazy(() => import("./pages/Protected/Home"));
const ProfileLayout = lazy(
  () => import("./pages/Protected/profile/ProfileLayout")
);
const Threads = lazy(() => import("./pages/Protected/profile/Threads"));
const Repost = lazy(() => import("./pages/Protected/profile/Repost"));
const Replies = lazy(() => import("./pages/Protected/profile/Replies"));
const Search = lazy(() => import("./pages/Protected/Search"));
const Add = lazy(() => import("./pages/Protected/Add"));
const Activities = lazy(() => import("./pages/Protected/Activities"));

const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Layout = lazy(() => import("./pages/Protected/Layout"));
import Loading from "./components/common/Loading";
const SinglePost = lazy(() => import("./components/posts/SinglePost"));

const App: React.FC = () => {
  const data: boolean = true;

  const router = createBrowserRouter([
    {
      path: "/",

      element: data ? <Layout /> : <Login />,

      children: data && [
        { index: true, element: <Home /> },
        { path: "search", element: <Search /> },
        { path: "add", element: <Add /> },
        { path: "activities", element: <Activities /> },

        {
          path: "profile",
          element: <ProfileLayout />,
          children: [
            { index: true, element: <Threads /> },
            { path: "post/:id", element: <SinglePost /> },
            { path: "repost/:id", element: <Repost /> },
            { path: "replies/:id", element: <Replies /> },
          ],
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};
export default App;
