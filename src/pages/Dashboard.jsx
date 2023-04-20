import React from "react";

import ProductNav from "../components/ProductNav";
import Checkout from "../components/Checkout";
import SearchBar from "../components/SearchBar";

function Dashboard() {
  return (
    <div>
      <div className="flex ">
        <div className="flex-1 w-1/4 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <SearchBar />
          {/* nav products */}
          <div>
            <ProductNav />
          </div>
          <div className="flex flex-row">
            <div className="w-1/2 mx-5 border rounded-lg">
              <h1>Products List</h1>
            </div>
            <div className="w-1/2 mx-5 border rounded-lg">
              <h1>Products List</h1>
            </div>
          </div>
        </div>
        <div className="bg-yellow-500 w-1/3">
          <Checkout />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
