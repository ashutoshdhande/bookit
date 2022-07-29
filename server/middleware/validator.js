const { body, validationResult } = require('express-validator');

// eslint-disable-next-line arrow-body-style
const userValidationRules = () => {
  return [
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
      'i'
    ),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push(err.msg));

  return res.status(422).json({
    msg: extractedErrors,
  });
};

module.exports = {
  userValidationRules,
  validate,
};

// password
// min 8 char long.
// At least one uppercase.
// At least one lower case.
// At least one special character.
