const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profiles");
const User = require("../../models/User");

const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");


// $route  GET api/profile/test
// @desc   return test data.
// @access public
router.get("/test", (req, res) => {
  res.json({ msg: "profile works" })
})

// $route  GET api/profile
// @desc   Get customer login info.
// @access private
router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .populate('user', ["name", "avatart"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "Can not find this user info.";
        return res.status(404).json(errors);
      }

      res.json(profile);
    }).catch(err => res.status(404).json(err));
})


// $route  POST api/profile
// @desc   Create or update user info
// @access private
router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;


  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(",");
  }

  profileFields.social = {};

  if (req.body.wechat) profileFields.social.wechat = req.body.wechat;
  if (req.body.QQ) profileFields.social.QQ = req.body.QQ;
  if (req.body.tengxunkt) profileFields.social.tengxunkt = req.body.tengxunkt;
  if (req.body.wangyikt) profileFields.social.wangyikt = req.body.wangyikt;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      // If user info does exist, update it.
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(profile => res.json(profile));
    } else {
      // If user info does not exist, create it.
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = "The user's handle personal information already exists, please do not re create it!";
          res.status(400).json(errors);
        }

        new Profile(profileFields).save().then(profile => res.json(profile));
      })
    }
  })

})

// $route  GET api/profile/handle/:handle
// @desc   Get personal information through handle
// @access public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ["name", "avatart"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Can not find this profile info.";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

// $route  GET api/profile/user/:user_id
// @desc   Through user_ID to get personal information
// @access public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ["name", "avatart"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Can not find this profile info.";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

// $route  GET api/profile/all
// @desc   Get all users information
// @access public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ["name", "avatart"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "Can not find any profile info.";
        res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json(err));
})


// $route  POST api/profile/experience
// @desc   Add personal experience
// @access Private
router.post("/experience", passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      }

      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    })
})


// $route  POST api/profile/education
// @desc   Add personal education
// @access Private
router.post("/education", passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description,
      }

      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    })
})


// $route  DELETE api/profile/experience/:epx_id
// @desc   Delete personal experience
// @access Private
router.delete("/experience/:epx_id", passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.epx_id);

      profile.experience.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
})

// $route  DELETE api/profile/education/:edu_id
// @desc   Delete personal education
// @access Private
router.delete("/education/:edu_id", passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.epx_id);

      profile.education.splice(removeIndex, 1);

      profile.save().then(profile => res.json(profile));
    })
    .catch(err => res.status(404).json(err));
})

// $route  DELETE api/profile
// @desc   Delete user.
// @access Private
router.delete("/", passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOneAndRemove({ user: req.user.id })
    .then(() => {
      User.findOneAndRemove({ _id: req.user.id })
        .then(() => {
          res.json({ success: true })
        })
    })
})

module.exports = router;