import { useSelector } from "react-redux";

const ProductItem = ({ product, showAddItemButton = true }) => {
  const productGlobal = useSelector((state) => state.product.products);
  return (
    <div className="p-2 bg-gray-50 shadow flex flex-col gap-2">
      {/*if image error show 404 from public src*/}
      <img
        className="h-[120px] w-full object-cover"
        src={product?.image}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/150";
        }}
        alt={product?.name}
      />
      <h3 className="font-bold uppercase">{product?.name}</h3>
      <p className="text-sm">
        {
          // number format
          new Intl.NumberFormat("en-ID", {
            style: "currency",
            currency: "IDR",
          }).format(product?.price)
        }
      </p>
      <p>{product?.description}</p>
      {showAddItemButton && (
        <button className="py-1.5 px-3 bg-orange-400 w-fit rounded-sm m-auto font-semibold uppercase">
          Add Item
        </button>
      )}
    </div>
  );
};

export default ProductItem;
