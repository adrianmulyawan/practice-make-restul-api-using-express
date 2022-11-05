const express = require('express');
const {
  getEmployes, 
  addEmploye, 
  getDetailEmploye, 
  updateEmploye, 
  deleteEmploye 
} = require('../controllers/employe.controller');
const { verifyToken } = require('../middleware/verify');

const router = express.Router();

// Tambahkan Middleware Verify Pada Route Employe
router.get('/employe', verifyToken, getEmployes);
router.post('/employe', verifyToken, addEmploye);
router.get('/employe/:id', verifyToken, getDetailEmploye);
router.put('/employe/:id', verifyToken, updateEmploye);
router.delete('/employe/:id', verifyToken, deleteEmploye);

module.exports = router;