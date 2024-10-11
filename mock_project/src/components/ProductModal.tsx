import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { validateProductForm } from "../utils/validation";
interface Product {
  id?: number;
  name: string;
  available: number;
  sold: number;
  categoryId: number;
  colorIds: number[];
  price: number;
}
interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  product?: Product | null;
  categories: { id: number; name: string }[];
  colors: { id: number; name: string }[];

}
const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  onSubmit,
  product,
  categories,
  colors,
}) => {
  const [formData, setFormData] = useState<Product>({
    id: new Date().getTime(),
    name: "",
    available: 0,
    sold: 0,
    categoryId: 0,
    colorIds: [] as number[],
    price: 0,
  });

  useEffect(() => {
    // Use optional chaining for safer access to nested properties
    setFormData({
      id: product?.id || new Date().getTime(),
      name: product?.name || "",
      available: product?.available || 0,
      sold: product?.sold || 0,
      categoryId: product?.categoryId || 0,
      colorIds: product?.colorIds || [], // Ensure colorIds is an empty array
      price: product?.price || 0,
    });
  }, [product]);

  const handleColorToggle = useCallback((colorId: number) => {
    setFormData((pre) => {
      const updatedColors = pre.colorIds.includes(colorId)
        ? pre.colorIds.filter((id) => id !== colorId)
        : [...pre.colorIds, colorId];
      return { ...pre, colorIds: updatedColors };
    });
  }, []);

  const handleSubmit = useCallback(() => {
    const error = validateProductForm(formData);
      if (error) {
        alert(error);
        return;
      }
    // console.log("Submitting product:", formData);
    onSubmit(formData);
    onClose();
  }, [formData, onSubmit, onClose]);

  const categoryArray = Object.values(categories);
  const renderedCategories = useMemo(() => {
    return categoryArray.map((category) => (
      <MenuItem key={category.id} value={category.id}>
        {category.name}
      </MenuItem>
    ));
  }, [categoryArray]);

  const colorArray = Object.values(colors);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{!product ? "Add new Product" : "Edit product"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          name="name"
          type="text"
          fullWidth
          variant="outlined"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          margin="dense"
          label="Available"
          name="available"
          type="text"
          fullWidth
          variant="outlined"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={formData.available?.toLocaleString("en-US", { style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          onChange={(e) => setFormData({ ...formData, available: parseFloat(e.target.value.replace(/,/g, "")) })}
        />
        <TextField
          margin="dense"
          label="Sold"
          type="text"
          fullWidth
          name="sold"
          value={formData.sold?.toLocaleString("en-US", { style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          onChange={(e) => setFormData({ ...formData, sold: parseFloat(e.target.value.replace(/,/g, "")) })}
        />
        <FormControl fullWidth sx={{ marginTop: "10px", marginBottom: "10px" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.categoryId}
            label="Category"
            onChange={(e) => setFormData({ ...formData, categoryId: +e.target.value })}
          >
            {renderedCategories}
          </Select>
        </FormControl>
        <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography sx={{ color: "#6f6f6f" }}>Color</Typography>
          {colorArray.map((color) => (
            <Button
              key={color.id}
              variant={
                Array.isArray(formData.colorIds) &&
                  formData.colorIds.includes(color.id)
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleColorToggle(color.id)}
              style={{ margin: "4px" }}
            >
              {color.name}
            </Button>
          ))}
        </Box>
        <TextField
          margin="dense"
          label="Price"
          name="price"
          type="text"
          fullWidth
          variant="outlined"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          value={formData.price?.toLocaleString("en-US", { style: "decimal", minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value.replace(/,/g, "")) })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">{product ? "Add" : "Update"}</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ProductModal;