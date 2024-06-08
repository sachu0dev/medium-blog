import {} from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Blogs from "./components/Blogs";
function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Blogs",
        element: <Blogs />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/blog:id",
        element: <Blog />,
      },
      {
        path: "/blog/create",
        element: <CreateBlog />,
      },
    ],
  },
]);

export default AppRouter;
