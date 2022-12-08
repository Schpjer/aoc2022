import * as fs from "fs";
import { execSync } from "child_process";
var path = require("path");
const file: string = fs.readFileSync("input.txt", "utf8");
const fileArray = file.split("\n");
const filePath: string[] = ["testfolder/"];

export const setUpFileStructure = () => {
  fileArray.map((element, index) => {
    const [elementOne, elementTwo, elementThree] = element.split(" ");
    if (elementTwo === "cd") {
      if (elementThree === "..") {
        filePath.pop();
        console.log(filePath);
      } else {
        if (elementThree !== "/") {
          filePath.push(`${elementThree}/`);
        }
      }
    } else if (elementOne === "dir") {
      execSync(`cd ${filePath.join("")} && mkdir ${elementTwo}`);
    } else if (parseInt(elementOne)) {
      execSync(`cd ${filePath.join("")} && touch ${elementOne}-${elementTwo}`);
    }
  });
};

let resultOne = 0;
let resultTwo = 10000000000;
const totalSpaceLeft = 70000000 - countTotalDirectorySize("testFolder");
const requiredSizeForDelete = 30000000 - totalSpaceLeft;
function countTotalDirectorySize(dir): number {
  let result = 0;
  fs.readdirSync(dir).forEach((file) => {
    let fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      result += countTotalDirectorySize(fullPath);
    } else {
      const fileName = fullPath.split("/").pop().split("-")[0];
      result += +fileName;
    }
  });
  if (result < 100000) {
    resultOne += result;
  }
  if (result > requiredSizeForDelete && result < resultTwo) {
    resultTwo = result;
  }
  return result;
}
countTotalDirectorySize("testFolder");
console.log(resultOne);
console.log(resultTwo);
