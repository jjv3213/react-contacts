const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");
  // check if jwt doesn't exist
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // if there is a token
  try {
    // verify token and get the payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // set the user we get from the payload to req.user, so we can access it from the route
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
