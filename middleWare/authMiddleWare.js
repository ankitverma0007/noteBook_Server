const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  //Get Authorization header
  const authHeader = req.headers.authorization;

  //If no token
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  //Extract token
  const token = authHeader.split(" ")[1];

  try {
    //Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Attach user info to request
    req.user = decoded;

    // Allow request to continue
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
