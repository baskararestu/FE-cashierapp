import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteProduct,
  fetchProducts,
} from "../features/products/productSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ProductItem = ({ product, showAddItemButton = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteClick = async () => {
    dispatch(deleteProduct(product.id_product));
    console.log(product.id_product);
    if (product.id_product) {
      toast.error(`Deleted product ${product.name}`);
      await dispatch(fetchProducts());
    }
  };
  return (
    <div className="p-2 bg-gray-50 shadow flex flex-col gap-2 h-full">
      {/*if image error show 404 from public src*/}
      <div>
        <img
          className="h-[120px] w-full object-cover"
          src={`http://localhost:3000/${product?.image}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/150";
          }}
          alt={product?.name}
        />
      </div>
      <div>
        <h3 className="font-bold uppercase">{product?.name}</h3>
      </div>
      <div>
        <p className="text-sm">
          {
            // number format
            new Intl.NumberFormat("en-ID", {
              style: "currency",
              currency: "IDR",
            }).format(product?.price)
          }
        </p>
      </div>
      <div className="flex-grow">
        <p>{product?.description}</p>
      </div>
      <div className="self-end">
        {showAddItemButton ? (
          <button className="py-1.5 px-3 bg-orange-400 rounded-sm font-semibold uppercase">
            Add Item
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="contained"
              className="py-1.5 px-3 rounded-sm"
              onClick={() => {
                navigate(`/edit-product/${product.id_product}`); // pass the product id to the URL
              }}
            >
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              className="py-1.5 px-3  rounded-sm"
              color="error"
              onClick={() => {
                handleDeleteClick();
              }}
            >
              <DeleteIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
