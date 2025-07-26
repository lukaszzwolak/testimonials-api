const Concert = require("../models/concert.model");

// GET all concerts
exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// GET random concert
exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concert = await Concert.findOne().skip(rand);
    if (!concert) return res.status(404).json({ message: "Not found" });
    res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// GET concert by ID
exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) return res.status(404).json({ message: "Not found" });
    res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// POST new concert
exports.create = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.status(201).json({ message: "OK", data: newConcert });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// PUT concert by ID
exports.update = async (req, res) => {
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
};

// DELETE concert by ID
exports.delete = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) return res.status(404).json({ message: "Not found" });

    await Concert.deleteOne({ _id: req.params.id });
    res.json({ message: "OK", data: concert });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
