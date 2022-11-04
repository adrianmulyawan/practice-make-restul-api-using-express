const express = require('express');
const {
  getNotes,
  addNewNote,
  detailNote,
  updateNote,
  deleteNote
} = require('../controllers/notes.controller');

const router = express.Router();

router.get('/note', getNotes);
router.post('/note', addNewNote);
router.put('/note/:id', updateNote);
router.delete('/note/:id', deleteNote);
router.get('/note/:id', detailNote);

module.exports = router;