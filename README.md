# Testimonials App

A full-stack web application for managing customer testimonials, concerts, and seat reservations – with real-time updates using WebSockets and MongoDB integration.

---

## Tech Stack

### Frontend:

- JavaScript (ES6+)
- React
- Redux + Thunk
- React Router
- Axios
- Bootstrap / Reactstrap
- SASS (SCSS)

### Backend:

- Node.js
- Express
- MongoDB + Mongoose
- Socket.IO (for real-time seat updates)
- CORS
- Nodemon

### Deployment & Dev Tools:

- Yarn
- PM2
- Git / GitHub
- MongoDB Atlas (remote database)

---

## Getting Started

### Backend Setup

```bash
# Install dependencies
yarn install

# Start backend server
yarn start
Server runs at: http://localhost:8000

Frontend Setup
bash
Kopiuj
Edytuj
cd client

# Install frontend dependencies
yarn install

# Build React app
yarn build
The frontend is automatically served from client/build.

API Endpoints (Examples)
Testimonials
GET /api/testimonials – get all testimonials

GET /api/testimonials/:id – get testimonial by ID

POST /api/testimonials – create new testimonial

PUT /api/testimonials/:id – update testimonial

DELETE /api/testimonials/:id – remove testimonial

🎵 Concerts
GET /api/concerts – get all concerts

GET /api/concerts/:id – get concert by ID

POST /api/concerts – add concert

PUT /api/concerts/:id – update concert

DELETE /api/concerts/:id – remove concert

Seats
GET /api/seats – get all seats

POST /api/seats – reserve a seat (with WebSocket update)

WebSockets
Real-time seat updates are broadcast via Socket.IO under the event: seatsUpdated.

MongoDB Integration
The backend connects to a MongoDB database (local or Atlas) using Mongoose.

Switch from local to remote by updating your mongoose.connect() URI in server.js.

Author
Built by Łukasz Zwolak
Project completed as part of the Kodilla Full Stack Developer Bootcamp.
```
