import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store/store";
import { fetchColor } from "../store/reducer/colorReducers";
import { Input } from "../components";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const Colors = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { entities: colors = {}, ids: colorIds = [], status } = useSelector((state: any) => state.color)
  React.useEffect(() => {
    // console.log(status);

    if (status === "idle") {
      dispatch(fetchColor())
      
    }
  }, [status, dispatch]);

  return (
    <>
      <TableContainer>
        <h1>Color list</h1>
        <Table>
          <TableHead>

          </TableHead>
          <TableBody>
            {colorIds.map((id: string) => (
              <TableRow>
                <TableCell>{colors[id].name}</TableCell>
                <TableCell>
                  <Button variant="contained" disableElevation color="primary" type="submit">
                    Add
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Colors