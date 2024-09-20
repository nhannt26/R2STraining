const product1 = [
  {
    id: 1,
    name: 'T shirt',
    quantity: 10,
    colors: ['red', 'yellow']
  },
  {
    id: 2,
    name: 'Pant',
    quantity: 10,
    colors: ['black']
  }
];
const product2 = [
  {
    id: 1,
    name: 'T shirt',
    quantity: 15,
    colors: ['red', 'green', 'white']
  },
  {
    id: 3,
    name: 'Skirt',
    quantity: 12,
    colors: ['green', 'black', 'white']
  }
];
const product3 = [
  {
    id: 4,
    name: 'Sneaker',
    quantity: 35,
    colors: ['black', 'white']
  },
  {
    id: 3,
    name: 'Skirt',
    quantity: 12,
    colors: ['blue', 'red']
  }
];

function mergeNArrayProducts(listProducts) {
  // Create a set to store unique product IDs
  const uniqueProductIds = new Set();

  // Create a new array to store the merged products
  const mergedProducts = [];

  // Iterate through each array of products
  for (const products of listProducts) {
    for (const product of products) {
      // Check if the product ID is already in the set
      if (!uniqueProductIds.has(product.id)) {
        // Add the product to the merged array and the set
        mergedProducts.push(product);
        uniqueProductIds.add(product.id);
      } else {
        // If the product ID already exists, find the matching product in the merged array
        const existingProduct = mergedProducts.find(p => p.id === product.id);

        // Update the existing product's quantity and colors
        existingProduct.quantity += product.quantity;
        existingProduct.colors = [...new Set([...existingProduct.colors, ...product.colors])]; // Merge colors without duplicates
      }
    }
  }

  return mergedProducts;
}

const products = [product1, product2, product3]
console.log(mergeNArrayProducts(products));

function formatCurrency(amount) {
  return amount.toLocaleString('en-US')
}

console.log(formatCurrency(100000));
console.log(formatCurrency(10000));

const number = 10000000;
const formattedCurrency = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
console.log(formattedCurrency);