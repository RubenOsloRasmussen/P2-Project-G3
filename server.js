import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { GetSudokuBoard } from "./backEnd/sudokuBoard.js";
import { profScoreCalc } from "./backEnd/proficiencyScoreCalc.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const BASE_PATH = process.env.NODE_ENV === "production" ? "/node0" : "";


app.use((req, res, next) => {
  console.log("REQ: ", req.method, req.url);
  next();
});

app.get("/health", (req, res) => {
  res.send("ok");
});

app.get(`${BASE_PATH}/api/sudoku`, (req, res) => {
  const sudokuNumber = Number(req.query.sudokuNumber ?? 1);
  const board = GetSudokuBoard(sudokuNumber);
  res.json({ board });
});

app.get(`${BASE_PATH}/api/proficiency`, (req, res) => {
    const err = Number(req.query.err ?? 0);
    const time = Number(req.query.time ?? 0);
    const data = profScoreCalc(err,time);
    res.json({ data });
});


app.get(BASE_PATH, (req, res) => {
  res.sendFile(
    path.join(__dirname, "frontEnd/pages/startPage/startPage.html")
  );
});

app.use(BASE_PATH, express.static(path.join(__dirname, "frontEnd")));

const server = http.createServer(app);

server.listen(3000, "127.0.0.1", () => {
  console.log("Server running on port 3000");
  console.log("http://localhost:3000/");
});

process.stdin.resume();