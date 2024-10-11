import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store";
import { addColor, deleteColor, fetchColor } from "../store/reducer/colorReducers";
import { Alert, Box, Button, Chip, Snackbar, Stack, TextField } from "@mui/material";
import ConfirmModal from "../components/ConfirmModal";
import ClearIcon from '@mui/icons-material/Clear';

const Colors = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { entities: colors = {}, ids: colorIds = [], status } = useSelector((state: any) => state.color)

  const [newColor, setNewColor] = useState({ name: "" })
  const [colorToDelete, setColorToDelete] = useState<number | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState<string>("")

  const handleAddColor = () => {
    if (newColor.name.trim()) {
      const colorWithId = { ...newColor, id: Date.now().toString() };

      dispatch(addColor(colorWithId))
        .unwrap()
        .then(() => {
          setSnackBarMsg("Thêm color thành công");
          setOpenSnackBar(true);
          setNewColor({ name: "" });
        })
        .catch((error) => {
          setSnackBarMsg("Thêm color thất bại");
          setOpenSnackBar(true);
        });
    }
  };

  const handleOpenDeleteConfirm = (id: number) => {
    setOpenModal(true);
    setColorToDelete(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false)
    setColorToDelete(null)
  }

  const handleDeleteColor = () => {
    if (colorToDelete) {
      dispatch(deleteColor(colorToDelete))
        .unwrap()
        .then(() => {
          setSnackBarMsg("Xóa color thành công");
          setOpenSnackBar(true);
          setOpenModal(false);
        })
        .catch((error) => {
          setSnackBarMsg("Xóa color thất bại");
          setOpenSnackBar(true);
        });
      setColorToDelete(null);
    }
  };

  React.useEffect(() => {
    // console.log(status);

    if (status === "idle") {
      dispatch(fetchColor())

    }
  }, [status, dispatch]);

  return (
    <>
      <Box>
        <Snackbar open={openSnackBar} autoHideDuration={3000}>
          <Alert severity="success">
            {snackBarMsg}
          </Alert>
        </Snackbar>
        <h1>Color List</h1>
        <Box display="flex" alignItems="center">
          <Stack direction="row" spacing={2}>
            {colorIds.map((id: string) => (
              <Chip
                key={id}
                label={colors[id].name}
                onDelete={() => handleOpenDeleteConfirm(colors[id].id)}
                deleteIcon={<ClearIcon />}
                sx={{ width: "100px", height: "40px" }}
              />
            ))}
          </Stack>
          <Box display="flex" alignItems="center">
            <TextField
              label="Add Color"
              value={newColor.name}
              onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
              sx={{marginLeft: "10px", marginRight: "10px"}}
            />
            <Button
              variant="outlined"
              disableElevation
              color="primary"
              type="submit"
              onClick={handleAddColor}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Box>
      <ConfirmModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleDeleteColor}
        title="Confirm Delete"
        message="Do you want to delete the color"
      />
    </>
  )
}

export default Colors