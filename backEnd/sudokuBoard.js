import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { merge } from "./helperfunctions.js";
import { mergeSort } from "./helperfunctions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.join(__dirname, "SudokuPuzzles.csv");

export function GetSudokuBoard(sudokuNumber) {
    const csv = fs.readFileSync(CSV_PATH, "utf-8");
    
    if (!sudokuString) {
        console.log("Could not load Sudoku string")
        return;
    }
    const puzzles = csv.split(",");

    let stringArr = [];
    let j = 0;

    for (var i = 0; i <= puzzles.length; i++) {

        let difArr = [puzzles[7 + i * 4]]

        j = puzzles[5 + i * 4]

        difArr.push(j)

        stringArr.push(difArr)
    }

    mergeSort(stringArr, 0, 343)

    console.log(stringArr)

    let k = Math.floor(
        (Math.random() - 0.5) * 9
    );

    const sudokuString = stringArr[sudokuNumber + k][1];

    return stringToBoard(sudokuString);
}

function stringToBoard(sudokuString) {
    const board = [];

    for (var i = 0; i < 9; i++) {
        const row = [];
        for (var j = 0; j < 9; j++) {
            const char = sudokuString[j+i*9];
            row.push(char === "." || char === "0" ? null : Number(char));
        }
        board.push(row);
    }

    return board;
}
