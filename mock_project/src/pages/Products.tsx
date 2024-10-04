import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchProduct } from "../store/reducer/productReducers";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { totalField } from "./style";
import ProductModal from "../components/ProductModal";
import { fetchColor } from "../store/reducer/colorReducers";
import { fetchCategory } from "../store/reducer/categoryReducers";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)
  // const state = useSelector((state: any) => console.log(state));  
  const { entities: products = {}, ids: productIds = [], status} = useSelector((state: any) => state.product)
  const { entities: categories = {}} = useSelector((state: any) => state.category)
  const { entities: colors = {}} = useSelector((state: any) => state.color)
  
  React.useEffect(() => {
    // console.log(status);

    if (status === "idle") {
      dispatch(fetchProduct());
    }
    dispatch(fetchColor())
    dispatch(fetchCategory())
  }, [status, dispatch]);

  const getCategoryNameById = (id: string) => {
    const category = categories[id];
    return category ? category.name : "Unknown";
  };
  // console.log(products);
  // console.log(colors);
  
  const getColorNames = (colorIds: number[]=[]) => {   
    const colorNames = colorIds.map(id => colors[id]?.name || "")
    return colorNames.join(', ')
  };

  const totalProducts = productIds.length;

  const totalAvailable = productIds.reduce(
    (acc: number, id: string) => acc + (products[id].available || 0), 0);

  const totalSold = productIds.reduce(
    (acc: number, id: string) => acc + (products[id].sold || 0), 0);

  const revenue = productIds.reduce(
    (acc: number, id: string) => acc + (products[id].price || 0), 0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleAddProduct = (product: any) => {
    console.log("New Product:", product);
  };
  return (
    <>
      <TableContainer>
        <h1>Seller</h1>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
          }}
        >
          <div style={{ width: "50%" }}></div>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={totalField}>Total {totalProducts}</div>
            <div style={totalField}>Available {totalAvailable}</div>
            <div style={totalField}>Sold {totalSold}</div>
            <div style={totalField}>Revenue {revenue.toLocaleString()}</div>
            <Button
              variant="outlined"
              color="success"
              startIcon={<LibraryAddIcon />}
              onClick={handleOpen}
            // onClick={handleAdd}  
            >
              Add
            </Button>
          </div>
        </div>      <Table>
          <TableHead>
            {/* {['No', 'Name', 'Available', 'Sold', 'Category', 'Colors', 'Price', 'Action'].map((text) => (
          ))} */}
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Available</TableCell>
              <TableCell>Sold</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Colors</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productIds.map((id: string, index: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{products[id].name}</TableCell>
                <TableCell>{products[id].available}</TableCell>
                <TableCell>{products[id].sold}</TableCell>
                <TableCell>{getCategoryNameById(products[id].categoryId)}</TableCell>
                <TableCell>{getColorNames(products[id].colors)}</TableCell>
                <TableCell>{products[id].price}</TableCell>
                <TableCell align="center">
                  <div>
                    <Button
                      variant="outlined"
                      disableElevation
                      color="primary"
                      type="submit"
                      startIcon={<CreateIcon />}
                      style={{ marginRight: "5px" }}
                      onClick={handleOpen}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      disableElevation
                      color="error"
                      type="submit"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ProductModal open={open} onClose={handleClose} onSave={handleAddProduct}/>
    </>

  );
}

export default Products