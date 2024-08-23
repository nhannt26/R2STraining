// function Student(fullname, dateOfBirth) {
//   this.fullname = fullname; // Le Viet Thanh
//   this.dateOfBirth = dateOfBirth; // 29/2/2008
// }

// Student.prototype.getFirstName = function() {
//   return this.fullname.split(' ').pop(); // Extract the first name
// };

// Student.prototype.getAge = function() {
//   const year = Number(this.dateOfBirth.split('/').pop())
//   return new Date().getFullYear() - year
// };

// const student = new Student('Nguyen Tri Nhan', '26/08/2001')
// console.log(student.getFirstName());
// console.log(student.getAge());

function SortedArray() {
  this.numbers = [];
}

SortedArray.prototype.initNumbers = function (arr) {
  this.numbers = arr.slice().sort((a, b) => a - b); // Create a sorted copy to maintain original array
};

SortedArray.prototype.get = function (num) {
  return this.numbers.findIndex(pre => pre === num)
}

SortedArray.prototype.set = function (num) {
  const index = this.get(num);

  if (index !== -1) {
    // Element already exists, do nothing
    return;
  }

  // Find the insertion point using binary search
  const insertionIndex = this.numbers.findIndex(element => element > num);

  // Insert the element at the correct position
  this.numbers.splice(insertionIndex, 0, num);
};

SortedArray.prototype.remove = function (num) {
  const index = this.get(num);

  if (index !== -1) {
    this.numbers.splice(index, 1);
  }
};

const sortedArray = new SortedArray()

sortedArray.initNumbers([4, 3, 6, 7, 9, 5])
console.log("Init number:", sortedArray.numbers);

console.log(sortedArray.get(9));

sortedArray.set(8)
console.log("Correct order arr after adding 8:", sortedArray.numbers);

sortedArray.remove(7)
console.log("Arr after removed:", sortedArray.numbers);
