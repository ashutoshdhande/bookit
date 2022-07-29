const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Get token
  // eslint-disable-next-line prefer-destructuring
  const token = req.cookies.token;
  console.log(req.cookies);
  // Check if token exists
  if (!token) {
    return res.status(404).json({
      msg: 'No token found!!!',
    });
  }
  // if token exists verify it
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.profile = decoded;
    // console.log(req.profile);
  } catch (err) {
    return res.status(401).json({
      msg: 'Invalid token!!!',
    });
  }

  return next();
};
