import React, { useState } from "react";

export default function CreateBlog() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <>
      <div className="flex flex-col w-full h-screen items-center">
        <div className="flex justify-between items-center h-16 px-24 w-full">
          <div className="text-xl font-semibold">Draft in Sushil</div>
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-2 py-1 rounded-full"
            >
              Publish
            </button>
            <div className="w-8 h-8 bg-slate-400 rounded-full"></div>
          </div>
        </div>
        <div className="mx-40 my-16 p-4 bg-white w-full max-w-3xl ">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 mb-4 text-5xl border-l-2 focus:outline-none"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <textarea
            placeholder="Tell your story..."
            className="w-full p-2 h-64 text-2xl focus:outline-none"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          ></textarea>
        </div>
      </div>
    </>
  );
}
