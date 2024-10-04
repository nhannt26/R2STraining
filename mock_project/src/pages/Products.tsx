import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { addProduct, deleteProduct, fetchProduct, updateProduct } from "../store/reducer/productReducers";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { totalField } from "./style";
import ProductModal from "../components/ProductModal";
import { fetchColor } from "../store/reducer/colorReducers";
import { fetchCategory } from "../store/reducer/categoryReducers";

const headers = [
  { text: "No" },
  { text: "Name" },
  { text: "Available" },
  { text: "Sold" },
  { text: "Category" },
  { text: "Colors" },
  { text: "Price" },
  { text: "Action" },
];

const Products = () => {
  const dispatch = useDispatch<AppDispatch>()
  // const state = useSelector((state: any) => console.log(state));  
  const { entities: products = {}, ids: productIds = [], status } = useSelector((state: any) => state.product)
  const { entities: categories = {} } = useSelector((state: any) => state.category)
  const { entities: colors = {} } = useSelector((state: any) => state.color)

  const [openModal, setOpenModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [productIdDelete, setProductIdDelete] = useState<number | null>(null);

  // const handleUpdate = (product: any) => {
  //   dispatch(updateProduct(product))
  // }

  const handleDelete = (productId: any) => {
    setProductIdDelete(productId)
    setOpenConfirmModal(true)
  }

  const handleConfirmDelete = () => {
    if (productIdDelete) {
      dispatch(deleteProduct(productIdDelete))
      setProductIdDelete(null)
      setOpenConfirmModal(false)
    }
  }

  const handleCloseModal = () => setOpenConfirmModal(false)

  React.useEffect(() => {
    // console.log(status);

    if (status === "idle") {
      dispatch(fetchProduct());
    }
    dispatch(fetchColor())
    dispatch(fetchCategory())
  }, [status, dispatch]);

  const handleEdit = (productId: number) => {
    setSelectedProduct(products[productId])
    setModalMode("edit")
    setOpenModal(true)
  }

  const handleSave = (updatedProduct: any) => {
    if (modalMode === "add") {
      dispatch(addProduct(updatedProduct))
    } else {
      dispatch(updateProduct(updatedProduct))
    }
    setOpenModal(false)
  }

  const handleAddProduct = () => {
    setSelectedProduct({ id: productIds.length + 1, name: "", available: 0, sold: 0, category: 1, colors: [], price: 0 })
    setModalMode("add");
    setOpenModal(true)
  };

  const totalProducts = useMemo(() => productIds.length, [productIds]);

  const totalAvailable = useMemo(() => {
    return productIds.reduce(
      (acc: number, id: string) => acc + (products[id].available || 0),
      0
    );
  }, [productIds, products]);

  const totalSold = useMemo(() => {
    return productIds.reduce(
      (acc: number, id: string) => acc + (products[id].sold || 0),
      0
    );
  }, [productIds, products]);

  const revenue = useMemo(() => {
    return productIds.reduce(
      (acc: number, id: string) => acc + (products[id].price || 0),
      0
    );
  }, [productIds, products]);

  return (
    <>
      <TableContainer>
        <h1>Seller</h1>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
          }}
        >
          <div style={{ width: "50%" }}></div>
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={totalField}>Total {totalProducts}</div>
            <div style={totalField}>Available {totalAvailable}</div>
            <div style={totalField}>Sold {totalSold}</div>
            <div style={totalField}>Revenue {revenue.toLocaleString()}</div>
            <Button
              variant="outlined"
              color="success"
              startIcon={<LibraryAddIcon />}
              onClick={handleAddProduct}
            // onClick={handleAdd}  
            >
              Add
            </Button>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.text}>
                  {header.text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            products={products}
            productIds={productIds}
            categories={categories}
            colors={colors}
            onEdit={handleEdit}
            onDelete={handleDelete} />
        </Table>
      </TableContainer>
      <ProductModal
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        onSubmit={}
      />
    </>

  );
}

export default Products