import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { addCategory, deleteCategory, fetchCategory, updateCategory } from "../store/reducer/categoryReducers";
import Notification from "../components/Notification";
import ConfirmModal from "../components/ConfirmModal";
import CategoryList from "../components/CategoryList";
import { validateString } from "../utils/validation";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { entities: categories = {}, ids: categoryIds = [], status } = useSelector((state: any) => state.category)
  const { entities: products = [] } = useSelector((state: any) => state.product);

  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [productCount, setProductCount] = useState(0);
  const [isAdding, setIsAdding] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error"; } | null>(null);

  React.useEffect(() => {
    // console.log(status);

    if (status === "idle") {
      dispatch(fetchCategory())
    }
  }, [status, dispatch]);

  const handleNotification = useCallback(
    (message: string, type: "success" | "error") => {
      setNotification({ message, type });
    },
    []
  );

  const handleEdit = useCallback((id: string) => {
    setEditId(id)
    setEditName(categories[id].name)
  }, [categories])

  const handleSave = useCallback(
    async (id?: string) => {
      const nameToValidate = id ? editName : newCategoryName;
      const validateFn = validateString("Category", 20);
      const error = validateFn(nameToValidate);
      if (error) {
        alert(error);
        return;
      }

      if (!id) {
        const maxId =
          categoryIds.length > 0 ? Math.max(...categoryIds.map(Number)) : 0;
        const newCategory = {
          id: (maxId + 1).toString(),
          name: newCategoryName,
        };

        const resultAction = await dispatch(addCategory(newCategory));
        if (addCategory.fulfilled.match(resultAction)) {
          handleNotification("Category added successfully!", "success");
        } else {
          handleNotification("Failed to add category", "error");
        }
        setIsAdding(false);
        setNewCategoryName("");
      } else {
        const resultAction = await dispatch(
          updateCategory({ id, name: editName })
        );
        if (updateCategory.fulfilled.match(resultAction)) {
          handleNotification("Category updated successfully!", "success");
        } else {
          handleNotification("Failed to update category", "error");
        }
        setEditId(null);
      }
    },
    [editName, newCategoryName, categoryIds, dispatch, handleNotification]
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

  const handleConfirmDelete = useCallback(async () => {
    if (selectedCategoryId) {
      const resultAction = await dispatch(deleteCategory(selectedCategoryId));
      if (deleteCategory.fulfilled.match(resultAction)) {
        handleNotification("Category deleted successfully!", "success");
      } else {
        handleNotification("Failed to delete category", "error");
      }
    }
    handleCloseModal();
  }, [selectedCategoryId, dispatch, handleCloseModal, handleNotification]);

  const handleAddCategory = useCallback(() => {
    setIsAdding(true);
  },[]);

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
            // disabled={isAdding}
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
            <CategoryList
              categoryIds={categoryIds}
              categories={categories}
              editId={editId}
              editName={editName}
              isAdding={isAdding}
              newCategoryName={newCategoryName}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
              onDeleteClick={handleDeleteClick}
              onNewCategoryChange={(e) => {
                if (editId) {
                  setEditName(e.target.value);
                } else {
                  setNewCategoryName(e.target.value);
                }
              }}
            />
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