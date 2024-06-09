import { UserContext } from "@/utils/context";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { userToken, setUserToken } = useContext(UserContext);
  const [user, setUser] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    if (userToken) {
      setUser(localStorage.getItem("name"));
    }
  });
  return (
    <div className="h-16 bg-black flex justify-between px-12">
      <div className=" flex items-center">
        <h1
          onClick={() => navigation("/blog")}
          className="text-white text-3xl font-bold"
        >
          Inspiration
        </h1>
      </div>
      <div className="flex items-center gap-10 ">
        <h1
          onClick={() => navigation("/blog")}
          className="text-white font-bold cursor-pointer"
        >
          Home
        </h1>
        <h1
          onClick={() => navigation("/blog/create")}
          className="text-white font-bold cursor-pointer"
        >
          Write
        </h1>
      </div>
      <div className="flex items-center gap-10">
        <h1 className="text-white font-bold">Hello, {user}</h1>
        {userToken ? (
          <button
            onClick={() => {
              setUserToken(null);
              localStorage.removeItem("userToken");
            }}
            className="text-white  font-bold"
          >
            Signout
          </button>
        ) : (
          <button className="text-white font-bold">Signin</button>
        )}
      </div>
    </div>
  );
}
