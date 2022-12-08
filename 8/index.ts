import { readFileSync } from "fs";
const file: string = readFileSync("input.txt", "utf8");
const fileArray = file.split("\n");

export const partOne = () => {
  let partOneResult = 0;
  fileArray.map((mainElement, indexOne) => {
    if (indexOne === 0 || indexOne === fileArray.length - 1) {
      partOneResult += mainElement.split("").length;
      return;
    }
    const treeRow = mainElement.split("");
    treeRow.map((mainElement, indexTwo) => {
      if (indexTwo === 0 || indexTwo === treeRow.length - 1) {
        partOneResult++;
        return;
      }
      const treesToRight = treeRow.slice(indexTwo + 1, treeRow.length);
      const treesToLeft = treeRow.slice(0, indexTwo);
      const treesAbove: string[] = [];
      const treesBelow: string[] = [];
      for (let i = indexOne - 1; i >= 0; i--) {
        treesAbove.push(fileArray[i].split("")[indexTwo]);
      }
      for (let i = indexOne + 1; i < fileArray.length; i++) {
        treesBelow.push(fileArray[i].split("")[indexTwo]);
      }

      const notVisableFromRight = treesToRight.some((element) => {
        return element >= mainElement;
      });
      const notVisableFromLeft = treesToLeft.some((element) => {
        return element >= mainElement;
      });
      const notVisableFromAbove = treesAbove.some((element) => {
        return element >= mainElement;
      });
      const notVisableFromBelow = treesBelow.some((element) => {
        return element >= mainElement;
      });

      if (
        !notVisableFromRight ||
        !notVisableFromLeft ||
        !notVisableFromAbove ||
        !notVisableFromBelow
      ) {
        partOneResult++;
      }
    });
  });
  return partOneResult;
};

export const partTwo = () => {
  let partTwoResult = 0;
  fileArray.map((mainElement, indexOne) => {
    if (indexOne === 0 || indexOne === fileArray.length - 1) {
      return;
    }
    const treeRow = mainElement.split("");
    treeRow.map((mainElement, indexTwo) => {
      if (indexTwo === 0 || indexTwo === treeRow.length - 1) {
        return;
      }

      const treesToRight = treeRow.slice(indexTwo + 1, treeRow.length);
      const treesToLeft = treeRow.slice(0, indexTwo).reverse();
      const treesAbove: string[] = [];
      const treesBelow: string[] = [];
      for (let i = indexOne - 1; i >= 0; i--) {
        treesAbove.push(fileArray[i].split("")[indexTwo]);
      }
      for (let i = indexOne + 1; i < fileArray.length; i++) {
        treesBelow.push(fileArray[i].split("")[indexTwo]);
      }

      const resultRight = calculateTotalTreesLower(treesToRight, mainElement);
      const resultLeft = calculateTotalTreesLower(treesToLeft, mainElement);
      const resultAbove = calculateTotalTreesLower(treesAbove, mainElement);
      const resultBelow = calculateTotalTreesLower(treesBelow, mainElement);

      const currentPartTwoResult =
        resultAbove * resultBelow * resultLeft * resultRight;
      if (currentPartTwoResult > partTwoResult) {
        partTwoResult = currentPartTwoResult;
      }
    });
  });
  return partTwoResult;
};

export const calculateTotalTreesLower = (
  trees: string[],
  mainTree: string
): number => {
  let result = 0;
  for (let i = 0; i < trees.length; i++) {
    if (trees[i] >= mainTree) {
      result += 1;
      break;
    } else if (trees[i] < mainTree) {
      result += 1;
    }
  }
  return result;
};

console.log(partOne());
console.log(partTwo());
