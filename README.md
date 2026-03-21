# L7X Boutik — Full-Stack E-Commerce

> Premium high-tech e-commerce platform. Smartphones, gaming setups, and accessories.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS (L7X Design System) |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Auth | Firebase Authentication |
| State | Zustand (cart) |
| Design | Stitch (Figma-like UI generation) |

## Pages

- `/` — Home with hero, featured products, category cards
- `/mobile` — Smartphones catalog
- `/setups` — Gaming setups catalog
- `/product/[slug]` — Product detail with specs table
- `/login` — Firebase Auth login (email + Google)
- `/checkout` — Checkout with order creation in Supabase
- `/order-confirmation` — Post-checkout confirmation

## Getting Started

```bash
cd app
npm install
cp .env.example .env.local
# Fill in your Supabase and Firebase credentials in .env.local
npm run dev
```

## Design System

Based on **The Digital Monolith** — Cyber-Minimalist High-Tech E-Commerce:
- **Primary accent**: Electric Cyan `#00E5FF`
- **Headlines**: Space Grotesk (Black/800)
- **Body**: Manrope
- **Effect**: Cyber Glow `0px 0px 20px rgba(0,227,253,0.25)`

## Database Schema

See `supabase/` folder for migrations. Tables: `products`, `profiles`, `cart_items`, `orders`, `order_items`.
