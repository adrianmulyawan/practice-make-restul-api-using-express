const express = require('express');
const {
  getEmployes, 
  addEmploye, 
  getDetailEmploye, 
  updateEmploye, 
  deleteEmploye 
} = require('../controllers/employe.controller');

const router = express.Router();

router.get('/employe', getEmployes);
router.post('/employe', addEmploye);
router.get('/employe/:id', getDetailEmploye);
router.put('/employe/:id', updateEmploye);
router.delete('/employe/:id', deleteEmploye);

module.exports = router;