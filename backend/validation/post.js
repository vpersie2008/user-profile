const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';


  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Comments can't be less than 10 characters and can't be more than 300!";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Comment cannot be empty!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}