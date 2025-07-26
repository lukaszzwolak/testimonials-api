const express = require("express");
const router = express.Router();
const Testimonial = require("../models/testimonial.model");

// GET all testimonials
router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET random testimonial
router.get("/testimonials/random", async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      return res.status(404).json({ message: "No testimonials available" });
    }

    const rand = Math.floor(Math.random() * count);
    const testimonial = await Testimonial.findOne().skip(rand);
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET testimonial by ID
router.get("/testimonials/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      res.status(404).json({ message: "Testimonial not found" });
    } else {
      res.json(testimonial);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// POST new testimonial
router.post("/testimonials", async (req, res) => {
  const { author, text } = req.body;

  if (!author || !text) {
    return res
      .status(400)
      .json({ message: "Both 'author' and 'text' are required" });
  }

  try {
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.status(201).json({ message: "OK", data: newTestimonial });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// PUT testimonial by ID
router.put("/testimonials/:id", async (req, res) => {
  const { author, text } = req.body;

  if (!author || !text) {
    return res
      .status(400)
      .json({ message: "Both 'author' and 'text' are required" });
  }

  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    testimonial.author = author;
    testimonial.text = text;
    await testimonial.save();

    res.json({ message: "OK", data: testimonial });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// DELETE testimonial by ID
router.delete("/testimonials/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    await Testimonial.deleteOne({ _id: req.params.id });
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
