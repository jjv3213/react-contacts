const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../middlewares/auth");

const User = require("../models/User");

const schema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string()
    .trim()
    .min(6)
    .required()
});

// @route   GET api/auth
// @desc    get logged in user
// @access   private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

// @route   POST api/auth
// @desc    authenticate user and get token
// @access   public
router.post("/", async (req, res) => {
  const result = Joi.validate(req.body, schema);
  const { email, password } = req.body;
  if (result.error === null) {
    try {
      let user = await User.findOne({ email });
      // check is a user with that email exists in db
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      // will be true or false depending on if passwords match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      // get back a jwt
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(500).send("server error");
    }
  } else {
    return res.status(400).json(result.error.message);
  }
});

module.exports = router;
