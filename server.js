const express = require("express");
const cors = require("cors");
const path = require("path");
const socketIo = require("socket.io");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/NewWaveDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB ✅"))
  .catch((err) => console.error("Error connecting to MongoDB ❌:", err));
const app = express();

// middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(cors());
app.use(express.json());

// logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// import routes
const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

// use routes with /api prefix
app.use("/api", testimonialsRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);

// serve static files from React build
app.use(express.static(path.join(__dirname, "client/build")));

// fallback route only for non-API paths
app.get("*", (req, res, next) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  } else {
    next();
  }
});

// 404 handler (for unmatched API routes)
app.use((req, res) => {
  res.status(404).json({ message: "Not Found", code: 404 });
});

// dynamic port
const PORT = process.env.PORT || 8000;

// utworzenie serwera HTTP
const http = require("http");
const server = http.createServer(app);

// integracja Socket.IO z serwerem
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// nasłuchiwacz połączenia Socket.IO
io.on("connection", (socket) => {
  console.log("New socket!");
});

// uruchomienie serwera
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
