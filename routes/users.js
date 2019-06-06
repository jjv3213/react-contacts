const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

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
router.post("/", (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    res.send("passed");
  } else {
    return res.status(400).json(result.error.message);
  }
});

module.exports = router;
