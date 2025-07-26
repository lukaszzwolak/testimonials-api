const express = require("express");
const router = express.Router();
const Seat = require("../models/seat.model");

// GET all seats
router.get("/seats", async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET seat by ID
router.get("/seats/:id", async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) res.json(seat);
    else res.status(404).json({ message: "Seat not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// POST new seat
router.post("/seats", async (req, res) => {
  const { day, seat, client, email } = req.body;

  if (!day || !seat || !client || !email) {
    return res.status(400).json({
      message: "All fields (day, seat, client, email) are required",
    });
  }

  try {
    const isTaken = await Seat.exists({ day, seat });
    if (isTaken) {
      return res.status(409).json({ message: "The slot is already taken..." });
    }

    const newSeat = new Seat({ day, seat, client, email });
    await newSeat.save();

    const allSeats = await Seat.find();
    req.io.emit("seatsUpdated", allSeats);

    res.status(201).json({ message: "OK", data: newSeat });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// PUT seat by ID
router.put("/seats/:id", async (req, res) => {
  const { day, seat, client, email } = req.body;

  if (!day || !seat || !client || !email) {
    return res.status(400).json({
      message: "All fields (day, seat, client, email) are required",
    });
  }

  try {
    const seatDoc = await Seat.findById(req.params.id);
    if (!seatDoc) {
      return res.status(404).json({ message: "Seat not found" });
    }

    seatDoc.day = day;
    seatDoc.seat = seat;
    seatDoc.client = client;
    seatDoc.email = email;
    await seatDoc.save();

    res.json({ message: "OK", data: seatDoc });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// DELETE seat by ID
router.delete("/seats/:id", async (req, res) => {
  try {
    const seatDoc = await Seat.findById(req.params.id);
    if (!seatDoc) {
      return res.status(404).json({ message: "Seat not found" });
    }

    await Seat.deleteOne({ _id: req.params.id });
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
