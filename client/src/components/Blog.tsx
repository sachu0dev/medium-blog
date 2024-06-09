import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/context.js";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import fetch from "../../../server/node_modules/unenv/runtime/npm/node-fetch.d";
import { BACKEND_URL } from "../config";

export default function Blog() {
  const { userToken } = useContext(UserContext);
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userToken) {
      navigate("/signin");
      console.log("no token");
    } else {
      fetchBlog();
    }
  }, []);

  const fetchBlog = async () => {
    console.log(id);
    try {
      const res = await fetch(BACKEND_URL + "blog/blog/" + id, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setBlog(data);
    } catch (err) {
      console.log(err);
    }
  };

  return blog ? (
    <>
      <div className="flex w-full h-screen p-16">
        <div className="w-4/6 h-screen p-4 ">
          <h1 className="text-5xl font-extrabold pr-8">{blog.title}</h1>
          <p className="my-4 font-semibold text-gray-500">
            Posted on {blog.publishedDate.split("T")[0]}
          </p>
          {blog.content.split("\n").map((paragraph, index) => (
            <p className="my-2 text-lg" key={index}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="w-2/6 h-screen p-4">
          <p>Author</p>
          <div className="flex">
            <div className="w-1/6 flex  items-center">
              <div className="w-8 h-8 bg-slate-400 rounded-full"></div>
            </div>
            <div className="w-5/6">
              <h3 className="text-2xl font-bold">{blog.author.name}</h3>
              <p className="text-gray-500 font-semibold">{blog.author.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    "Loading"
  );
}
