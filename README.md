# Image Search & Multi-Select App

**MERN + OAuth + Unsplash** | Internship Task – UD Studios

---

## Project Overview

A full-stack image search application built with the **MERN** stack, using **OAuth** authentication (Google, GitHub,  via Passport.js) and the **Unsplash API** for image search results. Only authenticated users can search, view personal search history, and multi-select images from a responsive 4-column grid.

This repository contains two folders: `/server` (Express API) and `/client` (Next.js / React frontend).

---

## Key Features

* OAuth authentication via Google, GitHub  (Passport.js)
* Only authenticated users can access search and history
* Search images from Unsplash API
* Save each search as `{ userId, term, timestamp }` in MongoDB
* Display top 5 searches (across all users) in a banner
* 4-column responsive image grid with overlay checkboxes for multi-select
* Client-side selected images counter
* Per-user search history with timestamps in a sidebar

---

## Tech Stack

* **Frontend**: Next.js (React) + Tailwind CSS
* **Backend**: Node.js + Express + Passport.js for OAuth
* **Database**: MongoDB (Mongoose)
* **Auth storage**: JWT in cookie (httpOnly recommended)
* **Image API**: Unsplash REST API

---

## Repo Structure

```
text/image-search-app
├── /client          ← React Frontend (Next.js)
├── /server          ← Express Backend
└── postman.json     ← import in postman app for api testing
```

---

## Getting Started (local)

### 1. Clone & Install

```bash
git clone https://github.com/rushikesh125/ud-studio-assessment
cd image-search-app
```

### 2. Backend (/server)

```bash
cd server
npm install
```

Create `server/.env` with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/image-search
JWT_SECRET=your_jwt_secret_2025
FRONTEND_URL=http://localhost:3000

UNSPLASH_ACCESS_KEY=your_unsplash_key

GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx

```

Start backend:

```bash
npm run dev
```

### 3. Frontend (/client)

```bash
cd ../client
npm install
npm run dev
```

Open: `http://localhost:3000`

---

## API Endpoints

> Backend base: `http://localhost:5000/api`

### Auth (OAuth)

* `GET /api/auth/google` — redirect to Google OAuth
* `GET /api/auth/github` — redirect to GitHub OAuth
* `GET /api/auth/logout` — logout and clear session/jwt

> OAuth callback routes should issue a JWT in an httpOnly cookie (e.g. `jwt`) or redirect back to the frontend with a short-lived code.

### Search

* `POST /api/search` — body `{ "term": "cats" }`

  * Saves `{ userId, term, timestamp }` to `searches` collection
  * Calls Unsplash API and returns the results to frontend
  * Example response: `{ total: 30, results: [ ...unsplash photos... ] }`

### Top Searches

* `GET /api/search/top-searches`

  * Returns top 5 most frequent search terms across all users
  * Example: `[ { term: "cats", count: 42 }, ... ]`

### History

* `GET /api/history` — returns logged-in user's searches sorted by timestamp

  * Example: `[ { term: "mountains", timestamp: "2025-10-01T12:34:56Z" }, ... ]`

---

