import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function ButtonAddProduct() {
  const navigate = useNavigate();
  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <div>
        <Button
          variant="contained"
          size="medium"
          onClick={() => navigate("/add-product")}
        >
          Add New Product
        </Button>
      </div>
    </Box>
  );
}
