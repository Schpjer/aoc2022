import { readFileSync } from "fs";
const file: string = readFileSync("input.txt", "utf8");
const fileArray = file.split("\n");

interface directory {
  name: string;
  fileSize: number;
  parentFolder?: string;
  subDirectories?: directory[];
}
const set: Set<directory> = new Set();
const filePath: string[] = [];
//TODO

fileArray.map((element, index) => {
  const [elementOne, elementTwo, elementThree] = element.split(" ");
  if (elementTwo === "cd") {
    if (elementThree === "..") {
      filePath.pop();
    } else {
      filePath.push(elementThree);
    }
  }
  console.log(filePath);
});
