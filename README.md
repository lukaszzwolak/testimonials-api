# 🎫 Testimonials App – Seat Booking System

A fullstack app for booking concert seats.  
Frontend: React + Redux  
Backend: Express + CORS  
Deployment: Replit

## 🔗 Live app

[View on Replit](https://replit.com/@twoj-login/testimonials-api)

## 🚀 How to run locally

```bash
# Backend
yarn install
yarn dev

# Frontend
cd client
yarn install
yarn start
🏗 Build for production
bash
Kopiuj
Edytuj
cd client
yarn build
Then the backend will serve the React app under /.

🌐 API URL config
In client/src/config.js:

js
Kopiuj
Edytuj
export const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api';
✅ Features
Live seat updates every 2 minutes

Server-side validation to prevent double bookings

Deployed as single Express app on Replit

Created by Łukasz Zwolak
