import React from "react";

export default function BlogList() {
  return (
    <>
      <div className="w-full flex flex-wrap justify-between p-4 my-4  border-b md:p-12 ">
        <div className="flex flex-col w-2/3 ">
          <p className="text-gray-500 text-sm">
            username <span>• 2 days ago</span>
          </p>
          <div>
            <h1 className="text-xl md:text-2xl font-bold mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, cum!
            </h1>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium odio vero recusandae! Nam quidem quod doloremque in
              accusantium cumque quo.
            </p>
          </div>
        </div>
        <div className=" w-1/3 h-[200px] mt-4 md:mt-0 flex justify-center items-center">
          <div className="w-[300px] h-[200px] bg-gray-300 rounded-sm overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://media.wired.com/photos/5fb70f2ce7b75db783b7012c/master/w_1920,c_limit/Gear-Photos-597589287.jpg"
              alt="Blog"
              style={{ width: "200px", height: "100px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
