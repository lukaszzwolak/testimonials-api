const express = require("express");
const router = express.Router();
const db = require("./../db");

// GET all testimonials
router.get("/testimonials", (req, res) => {
  res.json(db.testimonials);
});

// GET random testimonial
router.get("/testimonials/random", (req, res) => {
  if (db.testimonials.length === 0) {
    return res.status(404).json({
      error: "Not Found",
      message: "No testimonials available",
      code: 404,
    });
  }
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndex]);
});

// GET testimonial by ID
router.get("/testimonials/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const testimonial = db.testimonials.find((t) => t.id === id);

  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({
      error: "Not Found",
      message: `Testimonial with ID ${id} not found`,
      code: 404,
    });
  }
});

// POST new testimonial
router.post("/testimonials", (req, res) => {
  const { author, text } = req.body;

  if (!author || !text) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Both 'author' and 'text' are required",
      code: 400,
    });
  }

  const newId = db.testimonials.length
    ? db.testimonials[db.testimonials.length - 1].id + 1
    : 1;
  const newTestimonial = { id: newId, author, text };

  db.testimonials.push(newTestimonial);
  res.status(201).json({ message: "OK", data: newTestimonial });
});

// PUT testimonial by ID
router.put("/testimonials/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { author, text } = req.body;
  const index = db.testimonials.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Not Found",
      message: `Testimonial with ID ${id} not found`,
      code: 404,
    });
  }

  if (!author || !text) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Both 'author' and 'text' are required",
      code: 400,
    });
  }

  db.testimonials[index] = { id, author, text };
  res.json({ message: "OK", data: db.testimonials[index] });
});

// DELETE testimonial by ID
router.delete("/testimonials/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.testimonials.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      error: "Not Found",
      message: `Testimonial with ID ${id} not found`,
      code: 404,
    });
  }

  db.testimonials.splice(index, 1);
  res.json({ message: "OK" });
});

module.exports = router;
