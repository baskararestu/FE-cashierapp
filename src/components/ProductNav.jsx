import React from "react";

function ProductNav() {
  return (
    <div className="my-5 min-w-full h-auto flex flex-row justify-center items-center gap-16 text-xl ">
      <button className="border border-gray-600 rounded-md px-8">All</button>
      <button className="border border-gray-600 rounded-md px-8">Foods</button>
      <button className="border border-gray-600 rounded-md px-8">Drinks</button>
      <button className="border border-gray-600 rounded-md px-8">Combos</button>
    </div>
  );
}

export default ProductNav;
