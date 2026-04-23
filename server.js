import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(path.join(__dirname, "frontEnd")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontEnd/pages/startPage/startPage.html"));
});


app.listen(5500, () => {
  console.log("Server running at http://localhost:5500");
});
