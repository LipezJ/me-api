import express from "express";
import cors from "cors";
import http from "http";
import frontMatter from 'front-matter';

import { searchReq, blogListReq, blogReq, imgReq, jsonReq } from "./routes/routes.js";

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));
app.use(cors());

app.get("/projects", (req, res) => jsonReq(req, res, "projects.json"));
app.get("/links", (req, res) => jsonReq(req, res, "links.json"));
app.get("/img/:name", (req, res) => imgReq(req, res));
app.get("/blog/:name", (req, res) => blogReq(req, res));
app.get("/blog", (req, res) => blogListReq(req, res));
app.get("/search/:searchQuery", (req, res) => searchReq(req, res));

server.listen(process.env.PORT || 4000, () => console.log("Server is running..."));