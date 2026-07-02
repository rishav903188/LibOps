const Reservation = require("../models/reservation.model");
const {
  createReservation,
  getQueuePosition,
} = require("../services/reservation.service");

const reserveBook = async (req, res) => {
  try {
    const reservation = await createReservation(
      req.user._id,
      req.params.bookId,
    );
    const position = await getQueuePosition(req.params.bookId, reservation._id);

    res.status(201).json({ reservation, queuePosition: position });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// @route  GET /api/reservations/my
const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id })
      .populate("book", "title author isbn")
      .sort({ createdAt: -1 });

    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route  DELETE /api/reservations/:id

const cancelReservation = async (req, res) => {
  try {
    const reservation= await Reservation.findById(req.params.id);
    if(!reservation) return res.status(404).json({message: "Reservation not found"});

    if(reservation.user.toString() !== req.user._id.toString()){
        return res.status(403).json({message: "Not your reservation"});
    }
    if(["fulfilled", "cancelled"].includes(reservation.status)){
        return res.status(400).json({message: `Reservation already ${reservation.status}`});
    }

    if(reservation.status ==="notified"){
        const Book = require("../models/book.model");
        const book =await Book.findById(reservation.book);
        if(book){
            book.availableCopies+= 1;
            await book.save();
        }
    }

    reservation.status = "cancelled";
    await reservation.save();

    res.json(reservation);



  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {reserveBook, getMyReservations, cancelReservation};