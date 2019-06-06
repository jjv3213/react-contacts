const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

const auth = require("../middlewares/auth");

const User = require("../models/User");
const Contact = require("../models/Contact");

const schema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string(),
  type: Joi.string()
});

// @route   GET api/contacts
// @desc    get all user's contacts
// @access   private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});

// @route   POST api/contacts
// @desc    add new contact
// @access   private
router.post("/", auth, async (req, res) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        user: req.user.id,
        name,
        email,
        phone,
        type
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.log(error);
      return res.status(500).send("server error");
    }
  } else {
    return res.status(400).json(result.error.message);
  }
});

// @route   PUT api/contacts/:id
// @desc    update contact with given id
// @access   private
router.put("/:id", (req, res) => {
  res.send("update contact");
});

// @route   DELETE api/contacts/:id
// @desc    delete contact with given id
// @access   private
router.delete("/:id", (req, res) => {
  res.send("delete contact");
});

module.exports = router;
