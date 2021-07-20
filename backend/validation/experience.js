const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title of personal experience cannot be empty!";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Company of personal experience cannot be empty!";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Personal experience from cannot be empty!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}