import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store";
import { addColor, deleteColor, fetchColor } from "../store/reducer/colorReducers";
import { Alert, Box, Chip, Snackbar, SnackbarCloseReason, Stack, TextField } from "@mui/material";
import ConfirmModal from "../components/ConfirmModal";
import ClearIcon from '@mui/icons-material/Clear';
import { validateColor } from "../utils/validation";
import { Button } from "../components";

const Colors = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { entities: colors = {}, ids: colorIds = [], status } = useSelector((state: any) => state.color)

  const [newColor, setNewColor] = useState("")
  const [colorToDelete, setColorToDelete] = useState<number | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState<string>("")
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  React.useEffect(() => {
    // console.log(status);

    if (status === "idle") {
      dispatch(fetchColor())

    }
  }, [status, dispatch]);

  const handleNotification = useCallback(
    (message: string, type: "success" | "error") => {
      setNotification({ message, type });
    },
    []
  );

  const handleAddColor = useCallback(async (id?: string) => {
    const error = validateColor(newColor);
    if (error) {
      alert(error);
      return;
    }
    if (newColor.trim()) {
      const newColorId =
        colorIds.length > 0
          ? (Math.max(...colorIds.map(Number)) + 1).toString()
          : "1";
      const resultAction = await dispatch(
        addColor({ id: newColorId, name: newColor })
      );
      if (addColor.fulfilled.match(resultAction)) {
        handleNotification("Color added successfully!", "success");
      } else {
        handleNotification("Failed to add color!", "error");
      }
      setNewColor("");
    }
  }, [colorIds, dispatch, newColor, handleNotification]);

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

  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <>
      <Box>
        <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleCloseSnackBar}>
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
                sx={{ width: "90px", height: "40px" }}
              />
            ))}
          </Stack>
          <Box display="flex" alignItems="center">
            <TextField
              label="Add Color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value )}
              sx={{ marginLeft: "10px", marginRight: "10px" }}
            />
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              onClick={handleAddColor}
              label="Add"
            >
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