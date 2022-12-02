import { readFileSync } from "fs";

const file: string = readFileSync("input.txt", "utf8");
const fileArray: string[] = file.split("\n");

const resultObject = {
  A: 1,
  Y: 1,
  B: 2,
  Z: 2,
  C: 3,
  X: 3,
};
console.log(fileArray);
