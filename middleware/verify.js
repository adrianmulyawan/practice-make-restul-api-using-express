require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../models');

const Blacklist = db.Blacklist;

const verifyToken = async (req, res, next) => {
  // Cek Jika Header Terdapat Param Authorization Standar Bearer
  if (req.headers.authorization) {
    // Mengambil Bearer Token dari Header
    const token = req.headers.authorization.split(' ')[1];

    // Pengecekan token
    // Apakah token yang dikirim masuk kedalam daftar Blacklist / Tidak 
    const checkBlackList = await Blacklist.findOne({
      where: {
        token: token
      }
    });
    // Jika blacklist reutrn ini 
    if (checkBlackList) {
      return res.status(401).send({
        auth: false,
        message: 'Your token is blacklist, please login again'
      });
    }

    // Proses Verifikasi Token Dengan Secret Key yang telah dibuat
    const secret = 'secret';
    jwt.verify(token, secret, (err) => {
      if (err) {
        return res.status(500).send({
          auth: false, 
          message: err
        });
      }
      next();
    });
  } 
  else {
    res.status(401);
    res.send({
      auth: false,
      message: 'Token required!'
    });
  }
};

module.exports = { verifyToken };