const products = [
  {
    name: 'Tshirt',
    quantity: 20,
    models: {
      size: 20,
      id: 1,
      color: ['red', 'black'],
    },
  },
  {
    name: 'Pant',
    quantity: 19,
    models: {
      size: 26,
      id: 2,
      color: ['black', 'white'],
    },
  },
  {
    name: 'Long sleeve',
    quantity: 50,
    models: {
      size: 23,
      id: 4,
      color: ['green', 'yellow'],
    },
  },
];

function totalQuantity(products) {
  return {
    products: products.map(product => ({ name: product.name, quantity: product.quantity })),
    total: products.reduce((pre, product) => pre + product.quantity, 0),
  };
}

console.log(totalQuantity(products));

function insertPopularItem(modelId) {
  // Find the product containing the modelId
  const productToRemove = products.find(product => product && product.models.id === modelId);

  // Remove the product from the array
  if (productToRemove) {
    const index = products.indexOf(productToRemove);
    products.splice(index, 1);
  }

  // Insert the product at the beginning of the array
  products.unshift(productToRemove);
}

insertPopularItem(2)
console.log(products);
