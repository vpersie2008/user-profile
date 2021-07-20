const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "The length of the name can't be less than 2 digits and can't be more than 30 digits!";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name cannot be empty!";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email address cannot be empty!";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email address is invalid!";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password cannot be empty!";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "The length of the password cannot be less than 6 digits and cannot be more than 30 digits!";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password cannot be empty!";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "The two times password are inconsistent!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}