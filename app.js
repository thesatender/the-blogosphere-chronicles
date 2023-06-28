const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Discover a world of engaging and insightful content on our blogging platform. We are a passionate community of writers, sharing knowledge and ideas on a wide range of topics. Whether you're seeking inspiration, seeking answers, or simply looking for an enjoyable read, we've got you covered. Begin your journey by exploring our featured articles on the home page. These handpicked gems represent the essence of our platform and will give you a taste of what's to come. We're thrilled to have you here and can't wait to embark on this exciting blogging adventure together. Join us on this captivating journey of knowledge, inspiration, and personal growth. Happy reading!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
let posts = [];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {startingContent: homeStartingContent, posts: posts});
});

app.get("/about", function (req, res) {
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function (req, res) {
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function (req, res) {
  res.render("compose");
});


app.get("/posts/:topic", function (req, res) {
  const reqTitle = _.lowerCase(req.params.topic);
  let flag = 0;
  let title =""
  let content =""
  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === reqTitle) {
      title = post.title;
      content = post.content;
      flag = 1;
    }
  });
  if (flag ===1) {
    res.render("post", {postTitle: title, postContent: content});
  }

});



app.post("/compose", function (req, res) {

  const newPost = {
    title: req.body.postTitle,
    content: req.body.postBody
  }

  posts.push(newPost);

  res.redirect("/");
});












app.listen(3000, function () {
  console.log("Server started on port 3000");
});