# Zeeshan Hyder — Full-Stack Portfolio

A modern, full-stack portfolio with a public site and a private admin dashboard for managing all content (projects, skills, about section, and contact info) without touching code.

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Framer Motion, React Icons, Axios, react-hot-toast
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, bcryptjs, Multer + Cloudinary for image uploads

## Project Structure

```
portfolio/
├── client/              # React + Vite frontend
│   └── src/
│       ├── api/         # Axios instance
│       ├── components/  # Reusable UI pieces
│       ├── context/     # Auth context (admin session)
│       └── pages/
│           └── admin/   # Admin dashboard pages
├── server/               # Express + MongoDB backend
│   ├── config/           # DB + Cloudinary setup
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed.js           # One-time script to create your admin user + starter content
│   └── server.js
└── README.md
```

## 1. Prerequisites (all free)

- Node.js 18+ installed locally
- A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster
- A free [Cloudinary](https://cloudinary.com/users/register/free) account
- A [GitHub](https://github.com) account (for deployment)
- Free accounts on [Render](https://render.com) (backend) and [Vercel](https://vercel.com) (frontend)

## 2. Local Setup

### Backend

```bash
cd server
cp .env.example .env
```

Fill in `.env`:
- `MONGO_URI` — from MongoDB Atlas → Connect → Drivers (replace `<username>`, `<password>`, and add your database name)
- `JWT_SECRET` — any long random string (e.g. generate with `openssl rand -hex 32`)
- `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` — from your Cloudinary dashboard homepage
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — the login you'll use for the admin dashboard

Install and seed:

```bash
npm install
npm run seed   # creates your admin user + starter About/Contact/Skills content
npm run dev    # starts the API on http://localhost:5000
```

> Note: the seed script pre-fills About, Skills, and Contact info, but **not** Projects (those need images uploaded through Cloudinary). Add your projects from the admin dashboard once it's running.

### Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev    # starts the site on http://localhost:5173
```

Visit `http://localhost:5173` for the public site, and `http://localhost:5173/admin/login` to sign in with the admin credentials you set in `.env`.

## 3. MongoDB Atlas Setup (Free Tier)

1. Create a free M0 cluster.
2. Under **Database Access**, create a database user with a username/password.
3. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) so Render can connect.
4. Under **Connect → Drivers**, copy the connection string into `MONGO_URI`.

## 4. Cloudinary Setup (Free Plan)

No extra configuration needed — just copy the **Cloud Name**, **API Key**, and **API Secret** from your Cloudinary dashboard into the server `.env`. Uploaded images are automatically organized into `portfolio/projects` and `portfolio/about` folders.

## 5. Deployment

### Backend → Render

1. Push this repo to GitHub.
2. On Render, create a **New Web Service**, pointing at the `server` folder (Root Directory: `server`).
3. Build command: `npm install`  ·  Start command: `npm start`
4. Add all the same environment variables from your local `.env` in Render's **Environment** tab, but set `CLIENT_URL` to your production frontend URL. If you want to allow both local dev and production from the same backend, separate them with commas in `CLIENT_URL`.
5. Deploy. Render gives you a URL like `https://your-api.onrender.com`.
6. Run the seed script once, either via Render's shell (`npm run seed`) or by running it locally against your Atlas cluster before deploying.

Before deploying, make sure `server/.env` and `client/.env` stay local only. The repo now ignores those files, and the example env files use placeholders so you can safely copy them into your hosting provider without leaking secrets.

### Frontend → Vercel or Netlify

1. Import the same GitHub repo, set **Root Directory** to `client`.
2. Build command: `npm run build`  ·  Output directory: `dist`
3. Add environment variable `VITE_API_URL` = `https://your-api.onrender.com/api`
4. Deploy. You'll get a URL like `https://your-portfolio.vercel.app`.
5. Go back to Render and update `CLIENT_URL` to this exact URL (for CORS), then redeploy the backend. If you keep local dev working against the same backend, use a comma-separated allowlist.
6. Keep [client/vercel.json](client/vercel.json) in the repo so direct refreshes on routes like `/admin/login` and `/about` are rewritten to the single-page app instead of returning Vercel's `NOT_FOUND` page.

### Free-tier note

Render's free web services spin down after inactivity, so the first API request after idle time can take ~30–50 seconds to wake up. This is normal and costs nothing — just a brief delay on the first load.

## 6. Using the Admin Dashboard

Go to `/admin/login` on your deployed site and sign in with the admin email/password you set during seeding. From there you can:

- **Projects** — add/edit/delete, upload a featured image plus gallery screenshots, set category, tech stack, GitHub/live links, features, and challenges
- **Skills** — add/remove skills grouped by category
- **About** — edit your summary, resume link, profile picture, education, experience, achievements, and social links
- **Contact Info** — edit the email/phone/location/social links shown on the public Contact page
- **Messages** — read and delete messages submitted through the public contact form

## 7. Customization

- Colors, fonts, and spacing live in `client/tailwind.config.js` and `client/src/index.css`.
- The starter profile photo is at `client/src/assets/profile.jpg` — it's only a fallback shown until you upload a profile picture from the admin About page.
- Update `client/index.html` for the page title/meta description.

---

Built with a simple, beginner-friendly stack — no TypeScript, no complex build tooling, all free-tier deployable.
