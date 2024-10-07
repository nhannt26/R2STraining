import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { addCategory, deleteCategory, fetchCategory } from "../store/reducer/categoryReducers";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { entities: categories = {}, ids: categoryIds = [], status } = useSelector((state: any) => state.category)
  const { entities: products = {} } = useSelector((state: any) => state.product);

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [productCount, setProductCount] = useState<number>(0);
  const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false)

  React.useEffect(() => {
    // console.log(status);

    if (status === "idle") {
      dispatch(fetchCategory())
    }
  }, [status, dispatch]);

  const getProductCountByCategory = useCallback(
    (categoryIds: string) => {
      return Object.values(products).filter(
        (product: any) => product.category === categoryIds
      ).length
    },
    [products]
  )

  const handleEdit = useCallback((id: string) => {
    setEditId(id)
    setEditName(categories[id].name)
  }, [categories])

  const handleSave = useCallback((id: string) => {
    setEditId(null)
  }, [])

  const handleCancel = useCallback(() => {
    setEditId(null);
    setEditName("");
  }, []);

  const handleDeleteClick = useCallback(
    (id: string) => {
      setSelectedCategoryId(id);
      const count = getProductCountByCategory(id);
      setProductCount(count);
      setOpenModal(true);
    },
    [getProductCountByCategory]
  );

  const handleCloseDialog = useCallback(() => {
    setOpenModal(false);
    setSelectedCategoryId(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedCategoryId) {
      console.log("Deleting category with ID:", selectedCategoryId);
      dispatch(deleteCategory(selectedCategoryId));
    }
    handleCloseDialog();
  }, [selectedCategoryId, dispatch, handleCloseDialog]);

  const handleAddCategory = () => {
    setOpenCategoryModal(true);
  };

  const handleSubmitCategory = useCallback(
    (newCategory: any) => {
      console.log("Adding new category:", newCategory);
      const categoryToAdd = {
        ...newCategory,
        id: newCategory.id?.toString(),
      };
      const maxId =
        categoryIds.length > 0 ? Math.max(...categoryIds.map(Number)) : 0;
      categoryToAdd.id = (maxId + 1).toString();
      dispatch(addCategory(categoryToAdd));
      setOpenCategoryModal(false);
    },
    [categoryIds, dispatch]
  );

  return (
    <>
      <TableContainer>
        <h1>Category List</h1>
        <div>
          <Button
            variant="outlined"
            color="success"
            startIcon={<LibraryAddIcon />}
            onClick={handleAddCategory}
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
                    // onClick={handleOpen}
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