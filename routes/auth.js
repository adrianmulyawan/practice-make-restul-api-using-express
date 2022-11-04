const express = require('express');
const { check, validationResult } = require('express-validator');
const passwordHash = require('password-hash');
const db = require('../models');
const { register, login } = require('../controllers/auth.controller');

const Users = db.User;
const router = express.Router();

// Check Validation Register
// -> isAlphanumeric(): fungsi mengecek inputan kita harus angka / huruf
// -> isEmail(): fungsi untuk mengecek inputan harus berupa email
const checkValidationRegister = [
  check('username').not().isEmpty().withMessage('username is required').isLength({ min: 5, max: 12 }).isAlphanumeric().custom( async (value) => {
    const duplicate = await Users.findOne({
      where: {
        username: value
      }
    });

    if (duplicate) {
      throw new Error("Username has been registered");
    }
  }),
  check('fullname').not().isAlpha().isLength({ min: 3, max: 250 }),
  check('email').not().isEmpty().withMessage('email is required').isEmail().custom(async (value) => {
    const duplicate = await Users.findOne({
      where: {
        email: value
      }
    });

    if (duplicate) {
      throw new Error("Email has been registered");
    }
  }),
  check('password').not().isEmpty().withMessage('password is required').isAlphanumeric()
];

// Check Validation Login
// -> isAlphanumeric(): fungsi mengecek inputan kita harus angka / huruf
const checkValidationLogin = [
  check('username').not().isEmpty().withMessage('username is required').isAlphanumeric(),
  check('password').not().isEmpty().withMessage('password is required').isAlphanumeric()
];

// Simpan Data Register
const postParam = (req) => {
  // Hash Password
  const passwordToSave = passwordHash.generate(req.body.password);
  data = {
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: passwordToSave,
  };
  return data;
};

// Route Register 
router.post('/auth/register', [checkValidationRegister], (req, res) => {
  // Check ke Middleware Apakah Validation (tepenuhi / tidak?)
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(422)
    res.json({
      status: 422,
      message: "Oops Error Detect",
      data: errors
    });
  } else {
    register(postParam(req), res);
  }
});

// Route Login
router.post('/auth/login', [checkValidationLogin], (req, res) => {
  // Check ke Middleware Apakah Validation (tepenuhi / tidak?)
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422);
    res.json({
      status: 422,
      message: "Oops Error Detect",
      data: errors
    });
  } else {
    login(req, res);
  }
});

module.exports = router;