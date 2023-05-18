import express from "express";
import cors from "cors";
import http from "http";
import path from 'path';
import fs from 'fs';

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));
app.use(cors());

app.get("/projects", (req, res) => {
    return res.json(JSON.parse(fs.readFileSync(path.join(process.cwd() + "/public/data/projects.json"), 'utf8')));
});

app.get("/profileimg", (req, res) => {
    return res.sendFile(path.join(process.cwd() + "/public/img/me_profile.jpg"));
});

server.listen(process.env.PORT || 4000);