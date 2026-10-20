# FoodGo — Food Delivery Web Application

A full-stack food delivery application built with React, Vite, Node.js, Express, MongoDB, and JWT authentication.

## Features
- Customer registration and login
- Browse and search restaurants; filter by cuisine
- Restaurant menus and food images
- Shopping cart with quantity controls and one-restaurant-per-cart rule
- Delivery address and Cash on Delivery checkout
- Customer order history and order status
- Restaurant, rider, and admin role APIs
- Mongoose models and sample restaurant/food seed data

## Tech stack
- **Frontend:** React, React Router, Vite, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

## Requirements
Install Node.js (LTS) and MongoDB.

## Run locally

### 1. Configure the backend
```bash
cd server
npm install
````
Copy `.env.example` to `.env` and update the values. On Windows PowerShell:
```powershell
Copy-Item .env.example .env
```
Set a strong, private `JWT_SECRET` in `server/.env`. **Never commit `.env` or real credentials to GitHub.**

### 2. Start the backend
From the `server` folder:
```bash
npm start
```
Backend: `http://localhost:5000`

### 3. Add sample data (optional)
In a separate terminal:
```bash
cd server
npm run seed
```

### 4. Start the frontend
In another terminal, from the project root:
```bash
cd client
npm install
npm run dev
```
Frontend: `http://localhost:5173`

## Project structure
```text
food-delivery/
├── client/              # React + Vite frontend
│   ├── src/
│   ├── index.html
│   └── package.json
├── server/              # Express API and MongoDB models
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## Upload to GitHub
1. Extract this ZIP file.
2. Open a terminal in the extracted `food-delivery` folder.
3. Run:
```bash
git init
git add .
git commit -m "Initial commit: FoodGo food delivery app"
```
4. Create an empty repository on GitHub, then follow GitHub's instructions to connect it and push your code. Do not upload `node_modules` or `.env`.

## Notes
- Sample food images use external image URLs and require an internet connection.
- Make sure MongoDB is running and `MONGO_URI` is correct before starting the API.
- For deployment, configure environment variables in your hosting provider rather than uploading `.env`.
