import React from "react";

function ProductNav() {
  return (
    <div className="my-5 w-auto h-auto flex flex-row flex-wrap justify-center items-center gap-4 text-md ">
      <button className="border border-gray-600 rounded-md px-8">All</button>
      <button className="border border-gray-600 rounded-md px-8">Foods</button>
      <button className="border border-gray-600 rounded-md px-8">Drinks</button>
      <button className="border border-gray-600 rounded-md px-8">Combos</button>
    </div>
  );
}

export default ProductNav;
