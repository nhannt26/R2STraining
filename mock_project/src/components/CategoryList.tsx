import React from "react";
import { TableRow, TableCell, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "./Button";
interface CategoryListProps {
  categoryIds: string[];
  categories: Record<string, { name: string }>;
  editId: string | null;
  editName: string;
  isAdding: boolean;
  newCategoryName: string;
  onEdit: (id: string) => void;
  onSave: (id: string) => void;
  onCancel: () => void;
  onDeleteClick: (id: string) => void;
  onNewCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categoryIds,
  categories,
  editId,
  editName,
  isAdding,
  newCategoryName,
  onEdit,
  onSave,
  onCancel,
  onDeleteClick,
  onNewCategoryChange,
}) => {
  return (
    <>
      {categoryIds.map((id: string, index: number) => (
        <TableRow
          key={id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell style={{ width: "80%", }}>
            {editId === id ? (
              <div style={{ display: "flex" }}>
                <TextField
                  value={editName}
                  onChange={onNewCategoryChange}
                  variant="outlined"
                  size="small"
                />
                <div>
                  <Button label="Save" onClick={() => onSave(id)} />
                  <Button label="Cancel" color="warning" onClick={onCancel} />
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {categories[id].name}                
                {!editId}
                <div>
                  <Button
                    label="Edit"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(id)}
                    variant="outlined"
                    style={{ marginLeft: "40px" }}
                  />
                  <Button
                    label="Delete"
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => onDeleteClick(id)}
                    variant="outlined"
                  />
                </div>
              </div>
            )}
          </TableCell>
        </TableRow>
      ))}
      {isAdding && (
        <TableRow>
          <TableCell>{categoryIds.length + 1}</TableCell>
          <TableCell style={{ display: "flex" }}>
            <TextField
              value={newCategoryName}
              onChange={onNewCategoryChange}
              variant="outlined"
              size="small"
              placeholder="Enter new category name"
            />
            <div>
              <Button label="Add" onClick={() => onSave("new")} />
              <Button label="Cancel" color="warning" onClick={onCancel} />
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default CategoryList;