const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

const schema = Joi.object().keys({
  name: Joi.string()
    .min(2)
    .max(10)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string()
    .trim()
    .min(6)
    .required()
});

// @route   POST api/users
// @desc    register a user
// @access   public
router.post("/", async (req, res) => {
  // validate the inputs
  const result = Joi.validate(req.body, schema);
  const { name, email, password } = req.body;

  if (result.error === null) {
    try {
      // check if user with that email exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "user already exists" });
      }
      // if not, create a new user with that email and hash the password
      // the 10 is the generated salt added on
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({
        name,
        email,
        password: hashedPassword
      });
      // save user to db
      await user.save();
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
      return res.status(400).send("server error");
    }
  } else {
    return res.status(400).json(result.error.message);
  }
});

module.exports = router;
