const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Post");
const Profile = require("../../models/Profiles");
const validatePostInput = require("../../validation/post");

// $route  GET api/posts/test
// @desc   Return test data
// @access public
router.get("/test", (req, res) => {
  res.json({ msg: "posts works" })
})


// $route  POST api/posts
// @desc   Create a comment interface
// @access Private
router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
})


// $route  GET api/posts
// @desc   Get comments
// @access public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "Can not find comment information." }))
})

// $route  GET api/posts/:id
// @desc   Get single comment information
// @access public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostsfound: "Can not find this comment information." }))
})

// $route  DELETE api/posts/:id
// @desc   Delete single comment information
// @access Private
router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        // Judge whether it's me or not
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorized: "Invalid operation!" })
        }

        post.remove().then(() => res.json({ success: true }))
      })
      .catch(err => res.status(404).json({ postnotfound: "There is no such comment information." }))
  })
})


// $route  POST api/posts/like/:id
// @desc   Like interface
// @access Private
router.post("/like/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({ alreadyliked: "The user has already liked it." });
        }

        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ likederror: "Like error." }))
  })
})


// $route  POST api/posts/unlike/:id
// @desc   Cancel like interface
// @access Private
router.post("/unlike/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
          return res.status(400).json({ notliked: "The user didn't like it." })
        }

        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        post.save().then(post => res.json(post))
      })
      .catch(err => res.status(404).json({ likederror: "Cancel like error." }))
  })
})

// $route  POST api/posts/comment/:id
// @desc   Add comment interface
// @access Private
router.post("/comment/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }

      post.comments.unshift(newComment);
      post.save().then(post => res.json(post));

    })
    .catch(err => res.status(404).json({ postnotfound: "Add comment error." }))
})


// $route  DELETE api/posts/comment/:id
// @desc   Delete comment interface
// @access Private
router.delete("/comment/:id/:comment_id", passport.authenticate('jwt', { session: false }), (req, res) => {

  Post.findById(req.params.id)
    .then(post => {
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentnotexists: "The comment does not exist" })
      }

      const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
      post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "Delete comment error." }))
})

module.exports = router;