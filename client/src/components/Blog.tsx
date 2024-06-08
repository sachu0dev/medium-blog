import React from "react";

export default function Blog() {
  return (
    <>
      <div className="flex w-full h-screen p-16">
        <div className="w-4/6 h-screen p-4 ">
          <h1 className="text-5xl font-extrabold pr-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
            nobis?
          </h1>
          <p className="my-4 font-semibold text-gray-500">
            Posted on {"August 24, 2023"}
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Reprehenderit eius excepturi necessitatibus eaque? Alias eos nisi
            voluptatum id labore voluptas! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quos velit et earum debitis possimus
            eius magni tempore, quo delectus, error odio, quis alias? Officiis
            optio corporis asperiores, quis consectetur esse. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. In minima iste, alias maiores
            voluptas fugiat excepturi commodi qui unde dicta id nam temporibus
            omnis assumenda. Voluptate perspiciatis recusandae molestias,
            laborum deserunt reprehenderit quia sequi dolorem, voluptatum nihil,
            natus quam inventore voluptatem saepe? Blanditiis molestias quas
            quos tempore dolore, fugit dignissimos.
          </p>
        </div>
        <div className="w-2/6 h-screen p-4">
          <p>Author</p>
          <div className="flex">
            <div className="w-1/6 flex  items-center">
              <div className="w-8 h-8 bg-slate-400 rounded-full"></div>
            </div>
            <div className="w-5/6">
              <h3 className="text-2xl font-bold">Sushil</h3>
              <p className="text-gray-500 font-semibold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laborum, dolorum!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
