import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductItem from "../components/productItem";
import { fetchProducts } from "../features/products/productSlice";
import ButtonAddProduct from "../components/ButtonAddProduct";

function MyProduct() {
  const products = useSelector((state) => state.product.products);
  const page = useSelector((state) => state.product.pagination);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(1));
  }, []);

  return (
    <div className="container mx-3">
      <div className="mt-5 flex flex-col gap-2">
        <h3 className="text-xl font-bold ml-2">Product List</h3>
        <ButtonAddProduct />
      </div>

      <div className="grid grid-cols-4 gap-5 py-3">
        {products?.map((product) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              showAddItemButton={false}
            />
          );
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
  );
}

export default MyProduct;
