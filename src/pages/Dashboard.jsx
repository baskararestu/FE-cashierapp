import React, { useEffect } from "react";
import ProductNav from "../components/ProductNav";
import Checkout from "../components/Checkout";
import SearchBar from "../components/SearchBar";
// import redux
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";
import ProductItem from "../components/productItem";

function Dashboard() {
  const products = useSelector((state) => state.product.products);
  const page = useSelector((state) => state.product.pagination);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(1));
  }, []);
  return (
    <div>
      <div className="flex ">
        <div className="flex-1 w-1/4 p-4 border-2 border-dashed rounded-lg border-gray-700">
          <SearchBar />
          {/* nav products */}
          <div>
            <ProductNav />
          </div>
          <div className="main">
            <h3 className="text-xl font-bold">Product List</h3>
            <div className="grid grid-cols-4 gap-5 py-3">
              {products?.map((product) => {
                return <ProductItem key={product.id} product={product} />;
              })}
            </div>
            {/*  pagination  */}
            {page?.total > 1 && (
              <div className="flex justify-center mt-10">
                <button
                  disabled={page?.current === 1}
                  onClick={() => {
                    dispatch(fetchProducts(page?.current - 1));
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
                >
                  Prev
                </button>
                <div className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 border-t border-b border-gray-400">
                  {page?.current}
                </div>
                <button
                  disabled={page?.current === page?.total}
                  onClick={() => {
                    dispatch(fetchProducts(page?.current + 1));
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r"
                >
                  Next
                </button>
              </div>
            )}
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
