import path from "path";
import fs from "fs";
import frontMatter from "front-matter";

function getData() {
    const files = fs.readdirSync(
        path.join(process.cwd() + "/public/blog/"),
        "utf8"
    );
    const blogs = files.map((file) => {
        const data = fs.readFileSync(
            path.join(process.cwd() + "/public/blog/" + file),
            "utf8"
        );
        return frontMatter(data);
    });
    const projects = JSON.parse(
        fs.readFileSync(
            path.join(process.cwd() + "/public/data/projects.json"),
            "utf8"
        )
    );
    return { blogs , projects};
}
function searchStringInArray(str, strArray) {
    console.log(str, strArray)
    let result = false;
    strArray.forEach((item) => {
        if (item.includes(str)) {
            result = true;
        }
    });
    return result;
}

function byAttributes(data, searchQuery) {
    searchQuery = searchQuery.toLowerCase();
    const results = data.map(({ attributes, body }) => {
        if (
            searchStringInArray(searchQuery, attributes.topics) ||
            attributes.title.toLowerCase().includes(searchQuery) ||
            attributes.description.toLowerCase().includes(searchQuery) ||
            attributes.author.name.toLowerCase().includes(searchQuery) ||
            attributes.author.url.toLowerCase().includes(searchQuery) ||
            body.toLowerCase().includes(searchQuery)
        ) {
            return { ...attributes, type: "blog" };
        }
    });
    return results;
}

function byProjects(data, searchQuery) {
    searchQuery = searchQuery.toLowerCase();
    const results = data.map(({ languages, name, description, links }) => {
        if (
            searchStringInArray(searchQuery, languages) ||
            name.toLowerCase().includes(searchQuery) ||
            description.toLowerCase().includes(searchQuery)
        ) {
            return { name, description, languages, links, type: "project" };
        }
    });
    return results;
}

export function search(searchQuery) {
    const { projects, blogs } = getData();
    const blogsQuery = byAttributes(blogs, searchQuery).filter(Boolean);
    const projectsQuery = byProjects(projects, searchQuery).filter(Boolean);
    blogsQuery.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    return { blogsQuery, projectsQuery };
}