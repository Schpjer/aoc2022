import { readFileSync } from "fs";
const file: string = readFileSync("input.txt", "utf8");
const alphabet: string[] =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const fileArray: string[] = file.split("\n");

export const partOne = () => {
  let result = 0;
  fileArray.map((line: string) => {
    const lineArray: string[] = line.split("");
    const firstHalf: string[] = lineArray.slice(0, lineArray.length / 2);
    const secondHalf: string[] = lineArray.slice(lineArray.length / 2);
    let duplicate: number = 0;
    firstHalf.map((element) => {
      if (secondHalf.indexOf(element) > -1) {
        duplicate = alphabet.indexOf(element) + 1;
      }
    });
    result += duplicate;
  });
};

export const partTwo = () => {
  let result = 0;
  for (let i = 0; i < fileArray.length; i += 3) {
    const firstElf: string[] = fileArray[i].split("");
    const secondElf: string[] = fileArray[i + 1].split("");
    const thirdElf: string[] = fileArray[i + 2].split("");
    let duplicate: number = 0;
    firstElf.map((element) => {
      if (secondElf.indexOf(element) > -1 && thirdElf.indexOf(element) > -1) {
        duplicate = alphabet.indexOf(element) + 1;
      }
    });
    result += duplicate;
  }
};
partTwo();
