const profileSchema = {
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: String,
    required: true,
  },
};

module.exports = profileSchema;
