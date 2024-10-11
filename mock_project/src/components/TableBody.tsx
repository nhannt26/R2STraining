import React, { useCallback } from "react";
import TableRowComponent from "./TableRowComponent"; // Import component mới

const TableBody = ({
  products,
  productIds,
  categories,
  colors,
  onEdit,
  onDelete,
}: {
  products: any,
  productIds: any,
  categories: any,
  colors: any,
  onEdit: any,
  onDelete: any,
}) => {
  const getCategoryNameById = useCallback(
    (id: string) => {
      const category = categories[id];
      return category ? category.name : "Unknown";
    },
    [categories]
  );

  const getColorNamesById = useCallback(
    (colorIds: number[] = []) => {
      if (colorIds.length === 0) {
        return "No colors available";
      } else if (colorIds.length === 1) {
        const colorName = colors[colorIds[0]]?.name;
        return colorName || "";
      } else {
        return colorIds
          .map((colorId) => colors[colorId]?.name || "")
          .filter(Boolean)
          .join(", ");
      }
    },
    [colors]
  );
  
  return (
    <>
      {productIds.map((id: number, index: number) => {
        const product = products[id];
        const category = getCategoryNameById(product.categoryId);
        const colorNames = getColorNamesById(product.colorIds || []);

        return (
          <TableRowComponent
            key={id}
            product={product}
            index={index}
            category={category}
            colors={colorNames}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        );
      })}
    </>
  );
};

export default TableBody;