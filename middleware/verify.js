require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  // Cek Jika Header Terdapat Param Authorization Standar Bearer
  if (req.headers.authorization) {
    // Mengambil Bearer Token dari Header
    const token = req.headers.authorization.split(' ')[1];

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