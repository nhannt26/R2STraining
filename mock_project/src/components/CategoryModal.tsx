import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import React, { useCallback, useState } from "react"

interface Category {
  name: string
}

interface CategoryModalProps { 
  open: boolean,
  onClose: () => void,
  onSubmit: (category: Category) => void
}

const CategoryModal: React.FC<CategoryModalProps> = ({open, onClose, onSubmit}) => {
  const [categoryName, setCategoryName] = useState<string>("")

  const handleSubmit = useCallback(() => {
    onSubmit({name: categoryName})
    onClose()
  },[onSubmit, onClose, categoryName]) 

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Category</DialogTitle>
      <DialogContent>
        <TextField
          label="Category Name"
          type="text"
          fullWidth
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Add</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CategoryModal