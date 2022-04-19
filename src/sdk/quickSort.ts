/** Import data types */
import { Stocks } from "../types/data";

/** Sorting type */
type SortingType = "desc" | "asc";

/** Swap two elements */
const swap = (arr: Stocks, from: number, to: number): void => {
  let temp = arr[from];
  arr[from] = arr[to];
  arr[to] = temp;
};

/** Partition the array picking the last element as pivot */
const partition = (
  arr: Stocks,
  low: number,
  high: number,
  type: SortingType = "desc"
): number => {
  let pivot: number = arr[high].investmentRating; // Pick the last element of the array
  let from = low - 1; // Index of the smallest element

  for (let to = low; to <= high - 1; to++) {
    // Ascending order
    if (type === "asc") {
      if (arr[to].investmentRating < pivot) {
        from++;
        swap(arr, from, to);
      }
    } else {
      // Descending order
      if (arr[to].investmentRating > pivot) {
        from++;
        swap(arr, from, to);
      }
    }
  }
  swap(arr, from + 1, high);

  return from + 1;
};

/** Quick Sort helper funciton */
const quickSortHelper = (
  arr: Stocks,
  type: SortingType = "desc",
  low: number = 0,
  high: number = arr.length - 1
): void => {
  if (low < high) {
    // Partition index
    let pivot = partition(arr, low, high, type);

    // Recursively partition of the array
    quickSortHelper(arr, type, low, pivot - 1);
    quickSortHelper(arr, type, pivot + 1, high);
  }
};

/** Quick Sort */
const quickSort = (arr: Stocks, type: SortingType = "desc"): Stocks => {
  const data: Stocks = arr; // Unsorted data

  // Sort the array
  quickSortHelper(data, type);

  // Sorted data
  return data;
};

// /** Run example */
// const arr: Stocks = [
//   {
//     investmentRating: 89,
//     ticker: "APPL",
//     name: "Apple",
//     data: [],
//   },
//   {
//     investmentRating: 856,
//     ticker: "CHI",
//     name: "China",
//     data: [],
//   },
//   {
//     investmentRating: 45,
//     ticker: "TWI",
//     name: "Twitter",
//     data: [],
//   },
//   {
//     investmentRating: 89,
//     ticker: "MCS",
//     name: "Micrsoft",
//     data: [],
//   },
//   {
//     investmentRating: 3,
//     ticker: "FBC",
//     name: "Facebook",
//     data: [],
//   },
//   {
//     investmentRating: 5,
//     ticker: "ABC",
//     name: "Google",
//     data: [],
//   },
// ];

// // Print unsorted array
// console.log("Unsorted");
// for (let i = 0; i < arr.length; i++) console.log(arr[i]);

// const sortedData = quickSort(arr);

// console.log("\n");
// console.log("Sorted");
// // Print sorted array
// for (let i = 0; i < sortedData.length; i++) console.log(sortedData[i]);

export { quickSort };
