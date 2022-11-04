const db = require('../models');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
require('dotenv').config();

const Users = db.User;

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
    const username = req.body.username.trim();
    const password = req.body.password.trim();

    const checkUsername = await Users.findOne({ 
      where: {
        username: username 
      } 
    });
    const fetchResult = checkUsername.dataValues
    const verify = passwordHash.verify(password, fetchResult.password);

    // cek apakah password yang di input sama dengan di db
    // lalu cocokan menggunakan hash
    if (verify != true) {
      res.status(422);
      res.json({
        status: 422,
        message: "Something error, your Password incorect"
      });
    } else {
      // isi value token kita
      const userToken = {
        id: fetchResult.id,
        username: fetchResult.username
      };

      // Set token dengan value = user token
      // set secret key token kita untuk nanti validasi
      // set expired token
      // lalu berikan token jika berhasil login
      // const token = jwt.sign({userToken}, process.env.JWT_KEY, {
      //   expiresIn: "1h"
      // });
      const secret = 'secret';
      const token = jwt.sign({userToken}, secret, {
        expiresIn: "1hr"
      }, (err, token) => {
        if (err) {
          res.json({
            message: "Something error!",
            data: err
          })
        } else {
          res.status(200)
          res.json({
            status: 200,
            message: 'Auth granted, welcome!',
            token: token
          });
        }
      });
    }
  } catch (error) {
    res.status(400);
    res.json({
      message: error.message ? error.message : "failed when login process"
    });
  }
};

module.exports = { 
  register,
  login
}