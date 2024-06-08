import { useState } from "react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
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
        <div className="w-1/2 flex flex-col justify-center item-center text-center p-60">
          <h1 className="text-5xl font-bold">Create an account</h1>
          <span className="my-4 text-xl text-gray-500 font-semibold">
            Already have an account?{" "}
            <Link className="underline" to="/signin">
              Login
            </Link>
            <div className="text-start">
              <form onSubmit={handleSubmit}>
                <label className="block  text-black mt-2 text-xl">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className=" text-lg p-2 my-2  border border-gray-300 rounded-md w-full"
                />
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
                  Signup
                </button>
              </form>
            </div>
          </span>
        </div>
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
      </div>
    </>
  );
}
