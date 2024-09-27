function Counter() {
  let count = 0;
  const increment = () => {
    count++;
    // console.log("count in", count);
  };
  const decrement = () => {
    count--;
    // console.log("count de", count);
  };
  const reset = () => {
    count = 0;
    // console.log("reset", count);
  };
  return {
    increment,
    decrement,
    reset,
  };
}
const counter = Counter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
const TodoList = (function () {
  const tasks = [];
  function renderTask() {
    tasks.forEach((task) => {
      // console.log(`Task ${task.id}: ${task.value}`);
    });
  }
  function addTasks(value) {
    const lastTask = tasks[tasks.length - 1];
    tasks.push({
      id: lastTask ? lastTask.id + 1 : 1,
      value,
    });
  }
  function removeTask(index) {
    tasks.splice(index, 1);
  }
  return {
    renderTask,
    addTasks,
    removeTask,
  };
})(); //IIFE
TodoList.addTasks("hello world");
TodoList.addTasks("finish homework");
TodoList.addTasks("sleep at 11pm");
TodoList.renderTask();
TodoList.removeTask(0);
TodoList.renderTask();
function rateLimiter(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    // console.log('args', args);
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      return fn(...args);
    }
  };
}
function clickRate (date, date2) {
  // console.log(`click ### ${date.getDate()} ${date2.getDate()}`);
}
const handleRateLimit = rateLimiter(clickRate, 2000);
handleRateLimit(new Date('2024-02-01'), new Date('2024-02-02'))

function merge(arr1, m, arr2, n) {
  let i = m - 1; // Index for arr1
  let j = n - 1; // Index for arr2
  let k = m + n - 1; // Index for merged array

  while (i >= 0 && j >= 0) {
    if (arr1[i] > arr2[j]) {
      arr1[k] = arr1[i];
      i--;
    } else {
      arr1[k] = arr2[j];
      j--;
    }
    k--;
  }

  // If there are remaining elements in arr2, copy them to arr1
  while (j >= 0) {
    arr1[k] = arr2[j]; 
    j--;
    k--; 
  }
  return arr1;
}

// Example usage
const array1 = [1, 2, 7, 0, 0, 0, 0, 0];
const array2 = [1, 1, 3, 7, 7];

console.log(merge(array1, 3, array2, 5)); // Output: [1, 1, 1, 2, 3, 7, 7, 7]