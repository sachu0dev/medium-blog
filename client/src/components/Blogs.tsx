import React, { useState } from "react";
import BlogList from "./BlogList";

export default function Blogs() {
  const [blogs, setBlogs] = useState([1, 2, 3, 4, 5, 6, 4]);
  return (
    <>
      <div className="w-full h-screen p-12 ">
        <div className="mx-60 px-60 ">
          <div className="bg-white h-16 w-full flex items-center border-b-gray-200">
            <h1 className="text-lg ">For you</h1>
          </div>
          {blogs.map(() => (
            <BlogList />
          ))}
          <hr />
        </div>
      </div>
    </>
  );
}
