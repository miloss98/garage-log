<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/logo-on-dark.png">
    <img src="public/logo-on-light.png" alt="GarageLog" height="64">
  </picture>
</p>

<p align="center"><strong>Never miss a car service again.</strong></p>

GarageLog is a full-stack car maintenance tracker built with Next.js 16 and a custom Express API ([garage-log-api](https://github.com/miloss98/garage-log-api)). Track oil changes, services, tire changes and registration deadlines for all your vehicles — in one place.

🔗 **Live Demo:** [garage-log.vercel.app](https://garage-log.vercel.app)

---

## Features

- **Multi-vehicle support** — Add and manage multiple cars, each with its own full service history
- **Service records** — Log oil changes, small and big services, tire changes and registration renewals with dates and mileage
- **Smart alerts** — Automatic overdue and due-soon indicators based on next service date
- **Dashboard overview** — At-a-glance stats showing total vehicles, overdue services and upcoming deadlines
- **Car photos** — Upload and manage car images via UploadThing
- **Authentication** — Secure email/password auth with protected routes and per-user data isolation
- **Responsive design** — Fully functional on desktop and mobile

---

## Tech Stack

| Category         | Technology               |
| ---------------- | ------------------------ |
| Framework        | Next.js 16 (App Router)  |
| Language         | TypeScript               |
| Styling          | Tailwind CSS + ShadCN UI |
| Backend          | Express + Prisma         |
| Database         | PostgreSQL               |
| Auth             | JWT in httpOnly cookie   |
| Storage          | UploadThing              |
| Data fetching    | TanStack Query v5        |
| Forms            | React Hook Form + Zod    |
| Deployment       | Vercel (web), Render (API) |

---

## Environment

```
API_URL=https://garage-log-api-rprd.onrender.com
```

Browser requests go to `/api/*` on the app's own domain and are proxied to the API by a rewrite in `next.config.ts`, so the API's auth cookie is first-party.

---
