import { readFileSync } from "fs";
const file: string = readFileSync("creates.txt", "utf8");

export const parseCrates = (): any[][] => {
  const parsedFile: string[] = file.split("\n");
  const eachRowInFile: string[][] = [];
  const cratesArray: string[][] = [];

  for (let i = 0; i < parsedFile.length; i++) {
    eachRowInFile.push(parsedFile[i].split(""));
    cratesArray.push([]);
  }

  eachRowInFile.map((stringList: string[]) => {
    stringList.map((string: string, index) => {
      if (string.match(/[A-Z]/)) {
        var indexOfCrateRow = eachRowInFile[eachRowInFile.length - 1][index];
        cratesArray[+indexOfCrateRow - 1].push(string);
      }
    });
  });
  return cratesArray.map((crate: string[]) => crate.reverse());
};

export const partOne = () => {
  const crates = parseCrates();
  const movesList: string = readFileSync("input.txt", "utf8");
  const movesArray: string[] = movesList.split("\n");
  movesArray.map((moveString: string) => {
    const [, move, , from, , to] = moveString.split(" ");
    for (let i = 0; i < +move; i++) {
      crates[+to - 1].push(crates[+from - 1].pop());
    }
  });
};

export const partTwo = () => {
  const crates = parseCrates();
  const movesList: string = readFileSync("input.txt", "utf8");
  const movesArray: string[] = movesList.split("\n");
  movesArray.map((moveString: string) => {
    const [, move, , from, , to] = moveString.split(" ");
    const itemsToMove = crates[+from - 1].splice(
      crates[+from - 1].length - +move,
      +move
    );
    crates[+to - 1].push(...itemsToMove);
  });
};

partOne();
partTwo();
