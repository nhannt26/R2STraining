import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import React, { useState } from "react";
import ProductModal from "../components/ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchCategory } from "../store/reducer/categoryReducers";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { entities: categories = {}, ids: categoryIds = [], status } = useSelector((state: any) => state.category)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  React.useEffect(() => {
    // console.log(status);

    if (status === "idle") {
      dispatch(fetchCategory())
    }
  }, [status, dispatch]);

  return (
    <>
      <TableContainer style={{ marginTop: "20px" }}>
        <div>
          <Button
            variant="outlined"
            color="success"
            startIcon={<LibraryAddIcon />}
            onClick={handleOpen}
          >
            Add
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryIds.map((id: string, index: number) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{categories[id].name}</TableCell>
                <TableCell align="right">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer >
      {/* <ProductModal open={open} onClose={handleClose}/> */}
    </>
  )
}

export default Categories