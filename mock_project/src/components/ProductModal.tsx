import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React from "react";
interface Product {
  id?: number;
  name: string;
  available: number;
  sold: number;
  category: string;
  colors: string;
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
}) => {
  const [category, setCategory] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
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
        />
        <TextField
          margin="dense"
          label="Available"
          name="available"
          type="text"
          fullWidth
          variant="outlined"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
        <FormControl fullWidth sx={{ marginTop: "10px", marginBottom: "10px" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value={10}>Cloth</MenuItem>
            <MenuItem value={20}>Bag</MenuItem>
            <MenuItem value={30}>Accessory</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
          <Typography sx={{ color: "#6f6f6f" }}>Color</Typography>
          <ButtonGroup
            variant="contained"
            aria-label="Basic button group"
            sx={{ marginTop: "10px" }}
          >
            <Button>White</Button>
            <Button>Black</Button>
            <Button>Red</Button>
          </ButtonGroup>
        </Box>
        <TextField
          margin="dense"
          label="Price"
          name="price"
          type="number"
          fullWidth
          variant="outlined"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  );
};
export default ProductModal;