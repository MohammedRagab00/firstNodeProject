const express = require("express");
const mongoose = require("mongoose");

const app = express();

const Article = require("./models/Article");

mongoose
  .connect(
    "mongodb+srv://mr1312064:NqimrV6wxNmSiiAn@cluster0.xlhla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connecting successfully");
  })
  .catch((error) => {
    console.log("error with connecting to the DB", error);
  });
// mongodb+srv://mr1312064:NqimrV6wxNmSiiAn@cluster0.xlhla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.use(express.json());

// app.get("/hello", function())

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/", (req, res) => {
  res.send("hello node js project");
});

app.get("/numbers", (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers += i + " - ";
  }
  // res.send(`the numbers are: ${numbers}`);

  // res.send("<h1>Hello World</h1>");
  // res.sendFile(__dirname + "/views/numbers.html");
  res.render("numbers.ejs", {
    name: "meme",
    numbers: numbers,
  });
});

app.get("/findSummation/:number1/:number2", (req, res) => {
  //   console.log(req.params);
  const num1 = req.params.number1;
  const num2 = req.params.number2;
  const sum = Number(num1) + Number(num2);
  res.send(`${num1} + ${num2} = ${sum}`);
});

app.get("/sayHello", (req, res) => {
  //   console.log(req.params);
  //   const num1 = req.body.number1;
  //   const num2 = req.body.number2;
  //   console.log(req.query);

  //   //   const sum = Number(num1) + Number(num2);
  //   res.send(`hello ${req.body.name}`);

  res.json({
    name: req.body.name,
  });
});

app.put("/test", (req, res) => {
  res.send("You visited test");
});

app.post("/addComment", (req, res) => {
  res.send("post request on add comment");
});

app.delete("/testingDelete", (req, res) => {
  res.send("visiting delete request");
});

//* ====== Articles EndPoints ======
app.post("/articles", async (req, res) => {
  const newArticle = new Article();

  const artTitle = req.body.articleTitle;
  const artBody = req.body.articleBody;

  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.numberOfLikes = 0;
  await newArticle.save();

  res.json(newArticle);
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();

  res.json(articles);
});

app.get("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findById(id);

    return res.json(article);
  } catch (error) {
    console.log("error while reading article of id: ", id);
    return res.send("error");
  }
});

app.delete("/articles/:articleId", async (req, res) => {
  const id = req.params.articleId;
  try {
    const article = await Article.findByIdAndDelete(id);

    return res.json(article);
  } catch (error) {
    console.log("error while deleting article of id: ", id);
    return res.json(error);
  }
});

app.get("/showArticles", async (req, res) => {
  const articles = await Article.find();

  res.render("articles.ejs", {
    allArticles: articles,
  });
});

app.listen(3000, () => {
  console.log("I'm listening to port 3000");
});
