import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
    res.render("pages/index.ejs", { posts: posts });
});

app.get("/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/new", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    posts.push({ title, content });
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const post = posts[req.params.id];
    res.render("pages/edit.ejs", { post: post, id: req.params.id });
});

app.get("/post/:id", (req, res) => {
    const post = posts[req.params.id];
    res.render("pages/post.ejs", { post: post });
});

app.post("/edit/:id", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    posts[req.params.id] = { title, content };
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    posts.splice(req.params.id, 1);
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} => http://localhost:${PORT}`);
});