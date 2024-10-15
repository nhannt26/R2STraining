import { Button, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { addProduct, deleteProduct, fetchProducts, updateProduct } from "../store/reducer/productReducers";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { totalAddComponent, totalComponent, totalField } from "./style";
import ProductModal from "../components/ProductModal";
import { fetchColor } from "../store/reducer/colorReducers";
import { fetchCategory } from "../store/reducer/categoryReducers";
import TableBody from "../components/TableBody";
import ConfirmModal from "../components/ConfirmModal";
import Notification from "../components/Notification";

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
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error"; } | null>(null);
  const [originalProduct, setOriginalProduct] = useState<any>(null)

  React.useEffect(() => {
    // console.log(status);
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchColor())
      dispatch(fetchCategory())
    }
  }, [status, dispatch]);

  const handleNotification = useCallback(
    (message: string, type: "success" | "error") => {
      setNotification({ message, type });
    },
    []
  );

  const handleDelete = useCallback((productId: number) => {
    setProductIdDelete(productId)
    setOpenConfirmModal(true)
  }, [])

  const handleConfirmDelete = useCallback(async () => {
    if (productIdDelete) {
      const resultAction = await dispatch(deleteProduct(productIdDelete));

      if (deleteProduct.fulfilled.match(resultAction)) {
        setNotification({
          message: "Product deleted successfully!",
          type: "success",
        });
      } else {
        setNotification({
          message: "Failed to delete product",
          type: "error",
        });
      }
      setProductIdDelete(null);
      setOpenConfirmModal(false);
    }
  }, [productIdDelete, dispatch]);

  const handleCloseModal = useCallback(() => {
    setOpenConfirmModal(false)
    setSelectedProduct(null)
  }, [])

  const handleEdit = useCallback(
    (productId: number) => {
      const productToEdit = products[productId];
      setOriginalProduct({ ...productToEdit });
      setSelectedProduct(productToEdit);
      setModalMode("edit");
      setOpenModal(true);
    },
    [products]
  );

  const handleSave = useCallback(
    async (updatedProduct: any) => {
      const productToSave = {
        ...updatedProduct,
        colorIds: updatedProduct.colorIds.map((colorId: []) => Number(colorId)),
      };

      if (modalMode === "add") {
        const maxId =
          productIds.length > 0 ? Math.max(...productIds.map(Number)) : 0;
        productToSave.id = (maxId + 1).toString();
        const resultAction = await dispatch(addProduct(productToSave));
        if (addProduct.fulfilled.match(resultAction)) {
          handleNotification("Product added successfully!", "success");
        } else {
          handleNotification("Failed to add product!", "error");
        }
      } else if (updatedProduct.id) {
        productToSave.id = updatedProduct.id.toString();
        const resultAction = await dispatch(updateProduct(productToSave));
        if (updateProduct.fulfilled.match(resultAction)) {
          handleNotification("Product updated successfully!", "success");
        } else {
          handleNotification("Failed to update product!", "error");
        }
      }
      setSelectedProduct(null);
      setOpenModal(false);
    },
    [dispatch, productIds, handleNotification, modalMode]
  );

  const handleAddProduct = useCallback(() => {
    setSelectedProduct({
      name: "", available: "", sold: 0, category: 1, colors: [], price: "",
      id: new Date().getTime(),
    })
    setModalMode("add");
    setOpenModal(true)
  }, [])

  const totalProducts = useMemo(() => productIds.length, [productIds]);

  const totalAvailable = useMemo(() => {
    return productIds.reduce(
      (acc: number, id: string) => acc + (products[id]?.available || 0),
      0
    );
  }, [productIds, products]);

  const totalSold = useMemo(() => {
    return productIds.reduce(
      (acc: number, id: string) => acc + (products[id]?.sold || 0),
      0
    );
  }, [productIds, products]);

  const revenue = useMemo(() => {
    return productIds.reduce(
      (acc: number, id: string) => acc + (products[id]?.price * products[id]?.sold || 0),
      0
    ).toLocaleString();
  }, [productIds, products]);

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
        <h1>Seller</h1>
        <div style={totalAddComponent}>
          <div style={{ width: "50%" }}></div>
          <div style={totalComponent}>
            <div style={totalField}>Total {totalProducts.toLocaleString()}</div>
            <div style={totalField}>Available {totalAvailable.toLocaleString()}</div>
            <div style={totalField}>Sold {totalSold.toLocaleString()}</div>
            <div style={totalField}>Revenue {revenue}</div>
            <Button
              variant="outlined"
              color="success"
              startIcon={<LibraryAddIcon />}
              onClick={handleAddProduct}
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
      <ConfirmModal
        open={openConfirmModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message="Do you want to delete this product?"
      />
      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSave}
        product={selectedProduct}
        categories={categories || []}
        colors={colors || []}
      />
    </>

  );
}

export default Products