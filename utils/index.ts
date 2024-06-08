export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function sumColumns(matrix: number[][]) {
  if (matrix.length === 0) {
    return [];
  }

  const columnSums = new Array(matrix[0].length).fill(0);

  // Iterate through each column
  for (let col = 0; col < matrix[0].length; col++) {
    // Iterate through each row
    for (let row = 0; row < matrix.length; row++) {
      columnSums[col] += matrix[row][col];
    }
  }
  return columnSums;
}
