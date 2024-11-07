import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import fs from "fs";

const app = express();

app.get("/", (req, res) => {
  res.send("👋 Hello from server");
});

app.listen(5050, () => {
  console.log(`Server is listening at 5050`);
});
