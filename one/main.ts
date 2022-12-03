import { readFileSync } from "fs";

const file: string = readFileSync("input.txt", "utf8");
const fileArray: string[] = file.split("\n");

let result: number = 0;
let previous: number = 0;
let currentNumber: number = 0;
let resultArray: number[] = [];
fileArray.map((line: string) => {
  if (line) {
    currentNumber += +line;
  } else {
    resultArray.push(currentNumber);
    result = currentNumber > previous ? currentNumber : previous;
    previous = result;
    currentNumber = 0;
  }
});
const sum = resultArray
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((a, b) => a + b, 0);
console.log(sum);
