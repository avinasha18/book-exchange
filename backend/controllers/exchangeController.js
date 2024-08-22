const Exchange = require('../models/Exchange');
const Book = require('../models/Book');

exports.requestExchange = async (req, res) => {
  try {
    const { requestedBookId, offeredBookId } = req.body;
    const requestedBook = await Book.findById(requestedBookId);
    const offeredBook = await Book.findById(offeredBookId);

    if (!requestedBook || !offeredBook) {
      return res.status(404).json({ msg: 'One or both books not found' });
    }

    if (requestedBook.owner.toString() === req.user.id) {
      return res.status(400).json({ msg: 'Cannot request your own book' });
    }

    if (offeredBook.owner.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'You can only offer your own books' });
    }

    const newExchange = new Exchange({
      requester: req.user.id,
      owner: requestedBook.owner,
      requestedBook: requestedBookId,
      offeredBook: offeredBookId,
      status: 'pending', // Initial status as pending
    });

    const exchange = await newExchange.save();
    res.json(exchange);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find({
      $or: [{ requester: req.user.id }, { owner: req.user.id }],
    })
      .populate('requestedBook offeredBook', 'title author status')
      .populate('requester owner', 'name email');
    res.json(exchanges);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.respondToExchange = async (req, res) => {
  try {
    const { status } = req.body;
    const exchange = await Exchange.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: { status } },
      { new: true }
    );

    if (!exchange) {
      return res.status(404).json({ msg: 'Exchange not found or not authorized' });
    }

    if (status === 'accepted') {
      if (exchange.status === 'accepted') {
        // This means both users have accepted the exchange
        await Book.updateMany(
          { _id: { $in: [exchange.requestedBook, exchange.offeredBook] } },
          { $set: { status: 'exchanged' } }
        );
        res.json({ msg: 'Exchange completed successfully' });
      } else {
        res.json({ msg: 'Waiting for the other user to accept' });
      }
    } else if (status === 'rejected') {
      await exchange.remove();
      res.json({ msg: 'Exchange request rejected' });
    } else {
      res.json(exchange);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
