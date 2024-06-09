import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

function Profile({ username }) {
  const [bio, setBio] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [unpublishedBlogs, setUnpublishedBlogs] = useState([]);

  useEffect(() => {
    // Fetch user bio and blogs
    // fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user bio
      const bioResponse = await axios.get(
        BACKEND_URL + `/api/user/${username}/bio`
      );
      setBio(bioResponse.data.bio);

      // Fetch user blogs
      const blogsResponse = await axios.get(`/api/user/${username}/blogs`);
      setBlogs(blogsResponse.data);

      // Fetch user unpublished blogs
      const unpublishedBlogsResponse = await axios.get(
        `/api/user/${username}/blogs/unpublished`
      );
      setUnpublishedBlogs(unpublishedBlogsResponse.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateBio = async (newBio) => {
    try {
      // Update user bio
      await axios.put(`/api/user/${username}/bio`, { bio: newBio });
      setBio(newBio);
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  const publishBlog = async (blogId) => {
    try {
      // Publish blog
      await axios.put(`/api/blog/${blogId}/publish`);
      // Refetch user blogs to update the list
      fetchUserData();
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  };

  return (
    <div>
      <h2>Welcome, {username}</h2>
      <h3>Bio</h3>
      <p>{bio}</p>
      <button onClick={() => updateBio("New bio")}>Update Bio</button>

      <h3>Published Blogs</h3>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>

      <h3>Unpublished Blogs</h3>
      <ul>
        {unpublishedBlogs.map((blog) => (
          <li key={blog.id}>
            {blog.title}{" "}
            <button onClick={() => publishBlog(blog.id)}>Publish</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
