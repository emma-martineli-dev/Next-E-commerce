# QuickCart

A modern full-stack e-commerce storefront built with **Next.js 15**, **Clerk** authentication, **Stripe** payments, and **Tailwind CSS v4**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | Clerk (`@clerk/nextjs`) |
| Payments | Stripe (`@stripe/react-stripe-js`) |
| Animations | Motion (`motion`) |
| Notifications | React Hot Toast |

---

## Project Structure

```
quickcart/
├── assets/              # Static images and SVG icons
├── components/          # Shared UI components
│   ├── seller/          # Seller dashboard components
│   └── ui/              # Generic reusable UI primitives
├── constants/           # Static data (products, orders, slider, etc.)
├── context/             # AppContext — global state (cart, user, products)
├── hooks/               # Custom React hooks (e.g. useAuthGuard)
├── lib/                 # Server-side utilities (e.g. authSeller)
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── page.tsx     # Home page
│   │   ├── cart/        # Shopping cart
│   │   ├── shop/        # Product listing & detail ([id])
│   │   ├── my-orders/   # Order history
│   │   ├── add-address/ # Address management
│   │   ├── about/       # About page
│   │   ├── contact/     # Contact page
│   │   └── seller/      # Seller dashboard (product list, orders)
│   └── middleware.ts    # Clerk auth middleware
├── types/               # Shared TypeScript types
└── utils/               # Utility components (NavLink, etc.)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) account (for authentication)
- A [Stripe](https://stripe.com) account (for payments)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd quickcart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# App
NEXT_PUBLIC_CURRENCY=$
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Key Features

- **Product catalog** — Browse and filter products with a responsive grid layout
- **Product detail pages** — Dynamic routes with image gallery and add-to-cart
- **Shopping cart** — Persistent cart (localStorage), quantity controls, order summary
- **Authentication** — Clerk-powered sign-in/sign-up with redirect support
- **Seller dashboard** — Manage product listings and view orders
- **Stripe checkout** — Integrated payment flow
- **Responsive design** — Mobile-first layout with Tailwind CSS

---

## Path Aliases

The project uses TypeScript path aliases for clean imports:

| Alias | Resolves to |
|---|---|
| `@/*` | `./src/*` |
| `@components/*` | `./components/*` |
| `@context/*` | `./context/*` |
| `@hooks/*` | `./hooks/*` |
| `@constants/*` | `./constants/*` |
| `@assets/*` | `./assets/*` |
| `@utils/*` | `./utils/*` |

---

## Deployment

The project includes a `netlify.toml` for Netlify deployment. For Vercel, simply connect the repository — no extra configuration needed.

Make sure to add all environment variables from `.env.local` to your hosting provider's dashboard.
