# Image Search & Multi-Select App

**MERN + OAuth + Unsplash** | Internship Task – UD Studios

---

## Project Overview

A full-stack image search application built with the **MERN** stack, using **OAuth** authentication (Google, GitHub, Facebook via Passport.js) and the **Unsplash API** for image search results. Only authenticated users can search, view personal search history, and multi-select images from a responsive 4-column grid.

This repository contains two folders: `/server` (Express API) and `/client` (Next.js / React frontend).

---

## Key Features

* OAuth authentication via Google, GitHub and Facebook (Passport.js)
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
└── /postman         ← Postman collection + examples
```

---

## Getting Started (local)

### 1. Clone & Install

```bash
git clone <repo-url>
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

FACEBOOK_APP_ID=xxx
FACEBOOK_APP_SECRET=xxx
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
* `GET /api/auth/facebook` — redirect to Facebook OAuth
* `GET /api/auth/logout` — logout and clear session/jwt

> OAuth callback routes should issue a JWT in an httpOnly cookie (e.g. `jwt`) or redirect back to the frontend with a short-lived code.

### Search

* `POST /api/search` — body `{ "term": "cats" }`

  * Saves `{ userId, term, timestamp }` to `searches` collection
  * Calls Unsplash API and returns the results to frontend
  * Example response: `{ total: 30, results: [ ...unsplash photos... ] }`

### Top Searches

* `GET /api/top-searches`

  * Returns top 5 most frequent search terms across all users
  * Example: `[ { term: "cats", count: 42 }, ... ]`

### History

* `GET /api/history` — returns logged-in user's searches sorted by timestamp

  * Example: `[ { term: "mountains", timestamp: "2025-10-01T12:34:56Z" }, ... ]`

---

## Example cURL Requests

```bash
# Login (open in browser)
open http://localhost:5000/api/auth/google

# Search (send JWT cookie)
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -b "jwt=ey..." \
  -d '{"term": "mountains"}'

# Top Searches
curl http://localhost:5000/api/top-searches

# History
curl -b "jwt=ey..." http://localhost:5000/api/history

# Logout
curl http://localhost:5000/api/auth/logout
```

---

## Frontend Details

* **Search page**: input + search button; after authenticate, POST to `/api/search` and display results
* **Grid**: 4-column responsive layout (Tailwind `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`), each card shows image, photographer credit, and an overlay checkbox used to multi-select images
* **Selected counter**: global/local component state to track the number of checked images; displayed above the grid as `Selected: X images`
* **Top Searches Banner**: request `/api/top-searches` and display top 5 chips at top of page. Clicking a chip runs that search.
* **History Sidebar**: `GET /api/history` shows user's previous searches with human-friendly timestamps

---

## Backend Implementation Notes

* Use `passport-google-oauth20`, `passport-github2`, `passport-facebook` and custom callbacks that upsert users in MongoDB.
* After successful OAuth, sign a JWT including `userId` and send it to the client in an httpOnly cookie named `jwt` (recommended) or redirect with token.
* Protect endpoints `POST /api/search` and `GET /api/history` using a middleware that verifies JWT and sets `req.user`.
* Search model example (Mongoose):

```js
const SearchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  term: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now }
});
```

* Top searches aggregation example:

```js
Search.aggregate([
  { $group: { _id: '$term', count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 5 },
  { $project: { term: '$_id', count: 1, _id: 0 } }
])
```

* Unsplash API call example (server-side):

```js
const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(term)}&per_page=30`, {
  headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
});
const data = await res.json();
```

---

## Postman

Postman collection included at `/postman/Image_Search_API.json` with example requests for auth (open URL), search, top-searches, history and logout.

---

## Screenshots

Place screenshots in `/server/screenshots` or `/client/public/screenshots` and reference them in the repo. Example screenshots needed:

* `login.png` — OAuth Login
* `top-searches.png` — Top search banner
* `search-results.png` — Search + Multi-Select UI
* `multi-select.png` — Selected counter
* `history-sidebar.png` — Search history sidebar

---

## Deployment Notes

* Set environment variables on your host (e.g., Railway, Heroku, Vercel for frontend). Ensure OAuth callback URLs match provider settings.
* For production, use HTTPS and set cookie flags: `httpOnly`, `secure`, `sameSite='lax'`.

---

## Security & Privacy

* Do not commit `.env` to source control. Add `.env` to `.gitignore`.
* Rate-limit search endpoint to avoid abuse and hitting Unsplash quotas.
* Cache frequent searches (Redis or in-memory LRU) to reduce API calls.

---

## Troubleshooting

* `401 Unauthorized`: ensure JWT cookie is present and valid.
* `403` from Unsplash: check the access key and ensure you haven’t exceeded requests per hour/day.
* OAuth callback mismatch: check provider's redirect URI settings.

---

## License

MIT

---

## Contact

If you want changes to this README or the project scaffold, tell me what to add (examples, additional endpoints, README badges).
