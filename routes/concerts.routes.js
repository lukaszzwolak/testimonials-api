const express = require("express");
const router = express.Router();
const db = require("./../db");

// GET all concerts
router.get("/concerts", (req, res) => {
  res.json(db.concerts);
});

// GET concert by ID
router.get("/concerts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const concert = db.concerts.find((c) => c.id === id);
  if (concert) {
    res.json(concert);
  } else {
    res.status(404).json({
      error: "Not Found",
      message: `Concert with ID ${id} not found`,
      code: 404,
    });
  }
});

// POST new concert
router.post("/concerts", (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if (!performer || !genre || price == null || !day || !image) {
    return res.status(400).json({
      error: "Bad Request",
      message: "All fields (performer, genre, price, day, image) are required",
      code: 400,
    });
  }

  const newId = db.concerts.length
    ? db.concerts[db.concerts.length - 1].id + 1
    : 1;

  const newConcert = { id: newId, performer, genre, price, day, image };
  db.concerts.push(newConcert);

  res.status(201).json({ message: "OK", data: newConcert });
});

// PUT concert by ID
router.put("/concerts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { performer, genre, price, day, image } = req.body;
  const index = db.concerts.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Not Found",
      message: `Concert with ID ${id} not found`,
      code: 404,
    });
  }

  if (!performer || !genre || price == null || !day || !image) {
    return res.status(400).json({
      error: "Bad Request",
      message: "All fields (performer, genre, price, day, image) are required",
      code: 400,
    });
  }

  db.concerts[index] = { id, performer, genre, price, day, image };
  res.json({ message: "OK", data: db.concerts[index] });
});

// DELETE concert by ID
router.delete("/concerts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.concerts.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Not Found",
      message: `Concert with ID ${id} not found`,
      code: 404,
    });
  }

  db.concerts.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
