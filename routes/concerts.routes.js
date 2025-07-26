const express = require("express");
const router = express.Router();
const Concert = require("../models/concert.model");

// GET all concerts
router.get("/concerts", async (req, res) => {
  try {
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET concert by ID
router.get("/concerts/:id", async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) return res.status(404).json({ message: "Not found" });
    res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// POST new concert
router.post("/concerts", async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.status(201).json({ message: "OK", data: newConcert });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// PUT concert by ID
router.put("/concerts/:id", async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) return res.status(404).json({ message: "Not found" });

    concert.performer = performer;
    concert.genre = genre;
    concert.price = price;
    concert.day = day;
    concert.image = image;

    await concert.save();
    res.json({ message: "OK", data: concert });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// DELETE concert by ID
router.delete("/concerts/:id", async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) return res.status(404).json({ message: "Not found" });

    await Concert.deleteOne({ _id: req.params.id });
    res.json({ message: "OK", data: concert });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
