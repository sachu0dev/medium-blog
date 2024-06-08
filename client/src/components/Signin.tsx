import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <div className="bg-white display flex w-full h-screen">
        <div className="w-1/2 flex flex-col justify-center p-28 bg-slate-100">
          <div className="text-start">
            <h1 className="text-4xl font-bold mb-6">
              "Our mission is to drive progress through relentless innovation
              and a commitment to excellence."
            </h1>
            <h2 className="text-2xl font-semibold">Sushil Kumar</h2>
            <span className="text-xl text-gray-500">CEO, Sushil Kumar</span>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center item-center text-center p-56">
          <h1 className="text-5xl font-bold">Login to your account</h1>
          <span className="my-4 text-xl text-gray-500 font-semibold">
            Don't have an account?{" "}
            <Link className="underline" to="/signup">
              Signup?
            </Link>
            <div className="text-start">
              <form onSubmit={handleSubmit}>
                <label className="block  text-black mt-2 text-xl">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="m@example.com"
                  className=" text-lg p-2 my-2  border border-gray-300 rounded-md w-full"
                />
                <label className="block  text-black mt-2 text-xl">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="text-lg p-2 my-2  border border-gray-300 rounded-md w-full"
                />
                <button
                  className="block text-lg p-2 my-2  border text-white rounded-md w-full bg-black"
                  type="submit"
                >
                  Signin
                </button>
              </form>
            </div>
          </span>
        </div>
      </div>
    </>
  );
}