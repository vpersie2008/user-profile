const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require("../../config/keys");
const passport = require("passport");
const User = require("../../models/User");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// $route  GET api/users/test
// @desc   Return test data.
// @access public
router.get("/test", (req, res) => {
  res.json({ msg: "login works" })
})

// $route  POST api/users/register
// @desc   Return the JSON data of the request
// @access public
router.post("/register", (req, res) => {

  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Query whether there is a mailbox in the database
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email has been registered!" })
      } else {
        const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })

        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });


      }
    })
})

// $route  POST api/users/login
// @desc   Return token jwt passport
// @access public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ email: "User does not exist!" });
      }

      // Password matching
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const rule = { id: user.id, name: user.name, avatar: user.avatar };
            jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              if (err) throw err;
              res.json({
                success: true,
                token: "Bearer " + token
              });
            })
          } else {
            return res.status(400).json({ password: "Password error." });
          }
        })
    })
})

// $route  GET api/users/current
// @desc   return current user
// @access Private
router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
})

module.exports = router;