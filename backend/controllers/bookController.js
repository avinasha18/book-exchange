const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const newBook = new Book({
      title,
      author,
      genre,
      owner: req.user.id,
    });
    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserBooks = async (req, res) => {
  try {
    const books = await Book.find({ owner: req.user.id });
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ status: 'available' }).populate('owner', 'username');
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: { title, author, genre } },
      { new: true }
    );
    if (!book) return res.status(404).json({ msg: 'Book not found or not authorized' });
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!book) return res.status(404).json({ msg: 'Book not found or not authorized' });
    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};