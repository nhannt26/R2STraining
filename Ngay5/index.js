const arr = [3, 2, 5, 4, 3, 1, 5];

function findMin(arr) {
  let min = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i]
    }
  }
  return min
}

console.log(findMin(arr));


function findDuplicates(arr) {
  const duplicates = [];
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  
  return duplicates;
}

console.log(findDuplicates(arr));
