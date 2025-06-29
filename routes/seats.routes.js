const express = require("express");
const router = express.Router();
const db = require("./../db");

// GET all seats
router.get("/seats", (req, res) => {
  res.json(db.seats);
});

// GET seat by ID
router.get("/seats/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const seat = db.seats.find((s) => s.id === id);

  if (seat) {
    res.json(seat);
  } else {
    res.status(404).json({
      error: "Not Found",
      message: `Seat with ID ${id} not found`,
      code: 404,
    });
  }
});

// POST new seat
router.post("/seats", (req, res) => {
  const { day, seat, client, email } = req.body;

  if (!day || !seat || !client || !email) {
    return res.status(400).json({
      error: "Bad Request",
      message: "All fields (day, seat, client, email) are required",
      code: 400,
    });
  }

  const newId = db.seats.length ? db.seats[db.seats.length - 1].id + 1 : 1;
  const newSeat = { id: newId, day, seat, client, email };
  db.seats.push(newSeat);

  res.status(201).json({ message: "OK", data: newSeat });
});

// PUT seat by ID
router.put("/seats/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { day, seat, client, email } = req.body;
  const index = db.seats.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Not Found",
      message: `Seat with ID ${id} not found`,
      code: 404,
    });
  }

  if (!day || !seat || !client || !email) {
    return res.status(400).json({
      error: "Bad Request",
      message: "All fields (day, seat, client, email) are required",
      code: 400,
    });
  }

  db.seats[index] = { id, day, seat, client, email };
  res.json({ message: "OK", data: db.seats[index] });
});

// DELETE seat by ID
router.delete("/seats/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.seats.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Not Found",
      message: `Seat with ID ${id} not found`,
      code: 404,
    });
  }

  db.seats.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
