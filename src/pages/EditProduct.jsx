import React from "react";
import { useSelector } from "react-redux";

function EditProduct() {
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  return <div>EditProduct</div>;
}

export default EditProduct;
