const express = require('express');
const router = express.Router();
const { addBook, getUserBooks, getAllBooks, updateBook, deleteBook } = require('../controllers/bookController');
const auth = require('../middleware/auth');

router.post('/', auth, addBook);
router.get('/user', auth, getUserBooks);
router.get('/', auth, getAllBooks);
router.put('/:id', auth, updateBook);
router.delete('/:id', auth, deleteBook);

module.exports = router;