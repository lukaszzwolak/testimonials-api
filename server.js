const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Import routes
const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

// Use routes with /api prefix
app.use("/api", testimonialsRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);

// Root
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found", code: 404 });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
