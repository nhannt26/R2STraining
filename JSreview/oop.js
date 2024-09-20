function getFibN(n) {
  const fibSequence = [1, 1]

  for (let i = 2; i <= n; i++) {
    const nextFib = fibSequence[i - 1] + fibSequence[i - 2]
    fibSequence.push(nextFib)
  }

  return fibSequence[n - 1]
}

const index = 40

function calTime(fn, n) {

}

// console.log(getFibN(index));

const countryCodes = {
  VN: '+84', // Vietnam
  SG: '+65', // Singapore
  US: '+1', // United States
};
function formatPhoneNumber(phoneNumber, countryCode) {
  if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
    return "Invalid phone number";
  }

  // Determine the appropriate formatting based on the country code
  switch (countryCode) {
    case "VN": // Vietnam
      return phoneNumber.replace(/(\d{2})(\d{5})(\d{3})/, "+84 $1 $2 $3");
    case "SG": // Singapore
      return phoneNumber.replace(/(\d{4})(\d{7})/, "+65 $1 $2");
    case "US": // United States
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    default:
      return "Unknown country code";
  }
}

// Examples:
// const vietnameseNumber = '0987654321';
// const singaporeanNumber = '98765432';
// const usNumber = '1234567890';

// console.log(formatPhoneNumber(vietnameseNumber, 'VN')); // 098-765-4321
// console.log(formatPhoneNumber(singaporeanNumber, 'SG')); // +65-9876-5432
// console.log(formatPhoneNumber(usNumber, 'US'));

function mergeProduct(product1, product2) {
  const objProduct2 = {}
  const result = [...product2]
  for (let i = 0; i < product2.length; i++) {
    objProduct2[product2[i]['id']] = product2[i]
  }

  for (let i = 0; i < product1.length; i++) {
    if(objProduct2[product1[i]['id']]){
      result.push(product1[i])
    }
  }

  return result
}

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
    colors: ['red', 'yellow', 'white']
  },
  {
    id: 3,
    name: 'Skirt',
    quantity: 12,
    colors: ['green', 'black', 'white']
  }
];

function mergeProducts(product1, product2) {
  const mergedProducts = [];

  // Combine products based on ID
  for (const product of [...product1, ...product2]) {
    const existingProduct = mergedProducts.find(p => p.id === product.id);
    if (existingProduct) {
      // Merge properties for existing product
      existingProduct.quantity += product.quantity;
      existingProduct.colors = [...new Set([...existingProduct.colors, ...product.colors])];
    } else {
      // Add new product to mergedProducts
      mergedProducts.push({ ...product });
    }
  }

  return mergedProducts;
}

const mergedProducts = mergeProducts(product1, product2);
console.log(mergedProducts);