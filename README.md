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

- **Reminders by date or mileage** — Oil every 12 months or 15,000 km, whichever comes first; overdue and due-soon items surface automatically
- **Service history timeline** — Services, repairs and documents (registration, inspection, insurance) with mileage, cost and workshop
- **Expenses dashboard** — Spending per month, per car and per service type, in your own currency
- **Multiple vehicles** — Each car with its own photo, history and upcoming items
- **One-click demo** — A private, pre-filled demo garage per visitor, deleted after 24 hours
- **Mobile-first UI** — Sidebar on desktop, app-style tab bar and bottom sheets on phones, light and dark mode
- **Secure auth** — JWT in an httpOnly cookie, rate-limited login, per-user data isolation
- **API docs** — Interactive Swagger UI at [/api/docs](https://garage-log.vercel.app/api/docs)

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
