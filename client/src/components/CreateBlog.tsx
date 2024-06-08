import React from "react";

export default function CreateBlog() {
  return (
    <>
      <div className="flex flex-col w-full h-screen items-center">
        <div className="flex justify-between items-center h-16 px-24 w-full">
          <div className="text-xl font-semibold">Draft in Sushil</div>
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-2 py-1 rounded-full">
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
          />
          <textarea
            placeholder="Tell your story..."
            className="w-full p-2 h-64 text-2xl focus:outline-none"
          ></textarea>
        </div>
      </div>
    </>
  );
}
