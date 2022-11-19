var express = require("express");
var app = express();

var postsData = require("./data");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Some status codes that we will be using
// 200: Ok
// 201: Created
// 400: Bad Request
// 404: Not found
// 500: Some error occurred , generic error code

app.get("/posts", function (req, res) {
  res.status(200).json({
    posts: postsData,
  });
});

app.post("/posts", function (req, res) {
  var newId = postsData.length + 1;

  var title = req.body.title;
  var text = req.body.text;
  var user = req.body.user;
  var reactions = req.body.reactions;

  //send bad request error message
  if (!title || !text || !user || !reactions) {
    return res.status(400).json({
      message: "Bad Request. Please provide all fields.",
    });
  }

  var newPost = {
    id: newId,
    title: title,
    text: text,
    user: user,
    reactions: reactions,
  };

  postsData.push(newPost);

  return res.status(201).json({
    message: "Successfully created post",
  });
});

app.get("/posts/:id", function (req, res) {
  var id = req.params.id;
  var post;
  for (var i = 0; i < postsData.length; i++) {
    if (postsData[i].id == id) {
      post = postsData[i];
    }
  }

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  return res.status(200).json({
    post: post,
  });
});

app.put("/posts/:id", function (req, res) {
  var id = req.params.id;

  var title = req.body.title;
  var text = req.body.text;
  var user = req.body.user;
  var reactions = req.body.reactions;

  //send bad request error message
  if (!title || !text || !user || !reactions) {
    return res.status(400).json({
      message: "Bad Request. Please provide all fields.",
    });
  }

  var updatedPost = {
    id: id,
    title: title,
    text: text,
    user: user,
    reactions: reactions,
  };

  var postFoundAndUpdated = false;
  for (var i = 0; i < postsData.length; i++) {
    if (postsData[i].id == id) {
      postsData[i] = updatedPost;
      postFoundAndUpdated = true;
    }
  }

  if (!postUpdated) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  return res.status(200).json({
    message: "Post updated successfully",
  });
});

// Assignment, create delete post route using filter method
app.delete("/posts/:postId", function (req, res) {
  var id = req.params.postId;

  for (var i = 0; i < postsData.length; i++) {
    if (postsData[i].id == id) {
      postsData.splice(i,1)
      return res.status(201).json();
    }}
});

app.listen(3000, function () {
  console.log("Server is running");
});
