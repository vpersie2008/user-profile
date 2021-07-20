const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "The length of user name cannot be less than 2 digits and cannot be more than 40 digits!";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle cannot be empty!";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status cannot be empty!";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills cannot be empty!";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Url is invalid";
    }
  }

  if (!isEmpty(data.tengxunkt)) {
    if (!Validator.isURL(data.tengxunkt)) {
      errors.tengxunkt = "Url is invalid";
    }
  }

  if (!isEmpty(data.wangyikt)) {
    if (!Validator.isURL(data.wangyikt)) {
      errors.wangyikt = "Url is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}