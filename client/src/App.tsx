import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Outlet,
  useFetcher,
  useNavigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import Blogs from "./components/Blogs";
import { UserContext } from "./utils/context";

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));

  return (
    <UserContext.Provider value={{ userToken, setUserToken }}>
      <Outlet />
    </UserContext.Provider>
  );
}

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/Blog",
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
        path: "/blog/:id", // Change path to use dynamic parameter ':id'
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
