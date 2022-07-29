const { DateTime } = require('luxon');

const belowSixteen = (req, res, next) => {
  try {
    const dob = DateTime.fromISO(req.body.dob);
    const registrationDate = DateTime.fromISO(DateTime.now());
    const diff = registrationDate.diff(dob, ['years']).years;

    if (diff < 16) {
      return res.status(200).json({
        msg: 'Minimum 16 years of age required!!!',
      });
    }
  } catch (err) {
    console.error(err);
  }

  return next();
};

const isAboveEighteen = (req, res, next) => {
  try {
    const dob = DateTime.fromISO(req.body.dob);
    const registrationDate = DateTime.fromISO(DateTime.now());
    const diff = registrationDate.diff(dob, ['years']).years;

    if (diff < 18) {
      return res.status(200).json({
        msg: 'Adult content!!! minors not allowed',
      });
    }
  } catch (err) {
    console.error(err);
  }

  return next();
};

module.exports = {
  belowSixteen,
  isAboveEighteen,
};
