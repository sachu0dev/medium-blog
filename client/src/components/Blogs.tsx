import React, { useContext, useEffect, useState } from "react";
import BlogList from "./BlogList";
import { UserContext } from "@/utils/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();
  const { userToken } = useContext(UserContext);

  useEffect(() => {
    if (!userToken) {
      navigate("/signin");
      console.log("no token");
    } else {
      fetchBlogs();
    }
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "blog/blogs", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen p-12">
      <div className="mx-60 px-60">
        <div className="bg-white h-16 w-full flex items-center ">
          <h1 className="text-lg">For you</h1>
        </div>
        {blogs.map((blog) => (
          <BlogList key={blog.id} blog={blog} />
        ))}
        <hr />
      </div>
    </div>
  );
}
