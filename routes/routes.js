import fs from 'fs'
import path from 'path'

import frontMatter from 'front-matter'
import { search } from '../search/search.js';

export function jsonReq(req, res, name) {
  try {
    res.json(JSON.parse(fs.readFileSync(path.join(process.cwd() + "/public/data/" + name), 'utf8')));
  } catch {
    res.status(404).send("Not found")
  }
}

export function imgReq(req, res) {
  try {
    return res.sendFile(process.cwd() + "/public/img/" + req.params.name + '.png')
  } catch {
    res.status(404).send("Not found")
  }
}

export function blogReq(req, res) {
  try {
    const file = fs.readFileSync(path.join(process.cwd() + "/public/blog/" + req.params.name + ".mdx"), 'utf8')
    res.json(frontMatter(file))
  } catch {
    res.status(404).send("Not found")
  }
}

export function blogListReq(req, res) {
  try {
    const files = fs.readdirSync(path.join(process.cwd() + "/public/blog/"), 'utf8')
    const posts = files.map(file => {
      const data = fs.readFileSync(path.join(process.cwd() + "/public/blog/" + file), 'utf8')
      return frontMatter(data).attributes
    })
    posts.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
    res.json(posts)
  } catch {
      res.status(404).send("Not found")
  }
}

export function searchReq(req, res) {
  try {
    const result = search(req.params.searchQuery)
    res.json(result)
  } catch (e) {
    console.log(e)
    res.status(404).send("Not found")
  }
}