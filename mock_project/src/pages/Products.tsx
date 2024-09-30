import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { product } from "../store/reducer/productReducers";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  // const state = useSelector((state: any) => console.log(state));  
  const { entities: products = {}, ids: productIds = [], status, error } = useSelector((state: any) => state.product)

  React.useEffect(() => {
    // console.log(status);

    if (status === "idle") {
      dispatch(product());
    }
  }, [status, dispatch]);

  return (
    <TableContainer>
      <Table>
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
            <TableCell>Action</TableCell>
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
              <TableCell>{products[id].category}</TableCell>
              <TableCell>{products[id].colors}</TableCell>
              <TableCell>{products[id].price}</TableCell>
              <TableCell>
                <div>
                  <Button
                    variant="contained"
                    disableElevation
                    color="success"
                    type="submit"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    color="error"
                    type="submit"
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
  );
}

export default Products