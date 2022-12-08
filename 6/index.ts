import { readFileSync } from "fs";
const file: string = readFileSync("input.txt", "utf8");
const fileArray = file.split("");
export const getParsedValue = (split: number) => {
  for (let i = 0; i < fileArray.length; i++) {
    const arrayToCheck = fileArray.slice(i, i + split);
    const itemExists = arrayToCheck.some((element, index) => {
      return (
        arrayToCheck.includes(element) &&
        arrayToCheck.indexOf(element) !== index
      );
    });
    if (!itemExists) {
      console.log(i + split);
      break;
    }
  }
};

getParsedValue(4);
getParsedValue(14);
