import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { addCategory, deleteCategory, fetchCategory, updateCategory } from "../store/reducer/categoryReducers";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Notification from "../components/Notification";
import ConfirmModal from "../components/ConfirmModal";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { entities: categories = {}, ids: categoryIds = [], status } = useSelector((state: any) => state.category)
  const { entities: products = {} } = useSelector((state: any) => state.product);

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [productCount, setProductCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdding, setIsAdding] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error"; } | null>(null);

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

  const handleSave = useCallback(
    (id: string) => {
      // Early return to avoid unnecessary calculations if saving a new category
      if (id === "new") {
        const maxId =
          categoryIds.length > 0 ? Math.max(...categoryIds.map(Number)) : 0;
        const newCategory = {
          id: (maxId + 1).toString(),
          name: newCategoryName,
        };
        dispatch(addCategory(newCategory));
        setIsAdding(false);
        setNewCategoryName("");
        setNotification({ message: "Category added successfully!", type: "success", });
      }
      // Efficiently update category name using spread syntax
      dispatch(updateCategory({ id, name: editName }));
      setEditId(null);
      setNotification({ message: "Category updated successfully!", type: "success" });
    },
    // Optimized dependency array: Only include reactive values
    [editName, newCategoryName, dispatch, categoryIds]
  );

  const handleCancel = useCallback(() => {
    setEditId(null);
    setEditName("");
    setIsAdding(false)
    setNewCategoryName("")
  }, []);

  const handleDeleteClick = useCallback(
    (id: string) => {
      const count = Array.isArray(products)
        ? products.filter((product: any) => product.categoryId === id).length : 0;
      setProductCount(count);
      setSelectedCategoryId(id);
      setOpenModal(true);
    },
    [products]
  );

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
    setSelectedCategoryId(null);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (selectedCategoryId) {
      console.log("Deleting category with ID:", selectedCategoryId);
      dispatch(deleteCategory(selectedCategoryId));
    }
    handleCloseModal();
  }, [selectedCategoryId, dispatch, handleCloseModal]);

  const handleAddCategory = () => {
    setIsAdding(true);
  };

  return (
    <>
      <TableContainer>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <h1>Category List</h1>
        <div>
          <Button
            variant="outlined"
            color="success"
            startIcon={<LibraryAddIcon />}
            onClick={handleAddCategory}
            disabled={isAdding}
          >
            Add
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell></TableCell>
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
      <ConfirmModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`This category is being used by ${productCount} product(s). Are you sure you want to delete it?`}
      />
    </>
  )
}

export default Categories