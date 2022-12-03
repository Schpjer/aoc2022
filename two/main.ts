import { readFileSync } from "fs";

const file: string = readFileSync("input.txt", "utf8");
const fileArray: string[] = file.split("\n");

export const partOne = (): number => {
  const resultObject: { [key: string]: string } = {
    A: "rock",
    X: "rock",
    B: "paper",
    Y: "paper",
    C: "scissors",
    Z: "scissors",
  };

  const winrounds: { [key: string]: boolean } = {
    paperrock: true,
    scissorspaper: true,
    rockscissors: true,
  };

  const resultValues: { [key: string]: number } = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };

  let result = 0;
  fileArray.map((match: string) => {
    const matchArray: string[] = match.split("");
    const keyOne: string = resultObject[matchArray[0]];
    const keyTwo: string = resultObject[matchArray[2]];
    const resultValue = winrounds[`${keyTwo}${keyOne}`];
    if (keyOne === keyTwo) {
      result += resultValues[keyTwo] + 3;
    } else if (resultValue) {
      result += resultValues[keyTwo] + 6;
    } else {
      result += resultValues[keyTwo];
    }
  });
  return result;
};

export const partTwo = (): void => {
  let result = 0;
  fileArray.map((match: string) => {
    const matchArray: string[] = match.split("");
    const oppentDraw = matchArray[0];
    const expectedResult = matchArray[2];
    result += getRoundResult(oppentDraw, expectedResult);
    console.log(result);
  });
  console.log(result);
};

export const getRoundResult = (
  oppentDraw: string,
  expectedResult: string
): number => {
  switch (expectedResult) {
    case "X":
      if (oppentDraw === "A") {
        return 3;
      } else if (oppentDraw === "B") {
        return 1;
      } else if (oppentDraw === "C") {
        return 2;
      }
      break;
    case "Y":
      if (oppentDraw === "A") {
        return 1 + 3;
      } else if (oppentDraw === "B") {
        return 2 + 3;
      } else if (oppentDraw === "C") {
        return 3 + 3;
      }
      break;
    case "Z":
      if (oppentDraw === "A") {
        return 2 + 6;
      } else if (oppentDraw === "B") {
        return 3 + 6;
      } else if (oppentDraw === "C") {
        return 1 + 6;
      }
      break;
  }
  return 0;
};

partTwo();
