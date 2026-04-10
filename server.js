import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.static(path.join(__dirname, "front-end")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "front-end/pages/start-page/start.html"));
});


app.listen(5500, () => {
  console.log("Server running at http://localhost:5500");
});
