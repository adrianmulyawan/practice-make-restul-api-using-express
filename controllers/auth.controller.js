const db = require('../models');
const Users = db.User;
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');

const register = async (input, res) => {
  try {
    // Input berasal dari route hasil validasi
    // Jadi controller sudah bersih tidak ada logic pengecekan lagi 
    const user = await Users.create(input);
    res.status(201);
    res.json({
      status: 201,
      message: "Registration Successfully!",
      data: user
    });
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when added new data user"
    });
  }
};

const login = async (req, res) => {
  try {
    
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when login process"
    });
  }
};

module.exports = { 
  register,
  login,
}