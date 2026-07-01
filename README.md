<div align="center">

# Karibu E-Commerce

**Give All You Need — A Modern Shopping Experience**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/Zustand-5-443E38)](https://zustand-demo.pmnd.rs)

[![Live Demo](https://img.shields.io/badge/Live_Demo-Karibu-00C853?style=for-the-badge)](https://karibu-ecommerce.vercel.app)
[![View Portfolio](https://img.shields.io/badge/View_on_GitHub-181717?style=for-the-badge&logo=github)](https://github.com/wakadala-star/Karibu_E-commerce)

</div>

---

## Table of Contents

- [Live Demo](#live-demo)
- [About the Project](#about-the-project)
- [The Problem It Solves](#the-problem-it-solves)
- [Who It's For](#whos-it-for)
- [Tech Stack](#tech-stack)
- [Features & Capabilities](#features--capabilities)
- [How to Use](#how-to-use)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Frontend-Only Architecture](#frontend-only-architecture)
- [Future Implementations](#future-implementations)
- [Contributing](#contributing)
- [Remarks](#remarks)
- [Author](#author)
- [License](#license)

---

## Live Demo

🔗 **[https://karibu-ecommerce.vercel.app](https://karibu-ecommerce.vercel.app)**

> Experience Karibu in action: browse products, search, manage your cart, explore the blog, and test the full admin dashboard.

---

## About the Project

**Karibu** is a fully functional, modern e-commerce web application built entirely with frontend technologies. The name "Karibu" means "Welcome" in Swahili, and that's exactly what this platform offers: a warm, intuitive, and seamless shopping experience for everyone.

From product discovery and smart search to secure checkout, real-time order tracking, notifications, and a professional blog — Karibu is designed to feel like a complete online marketplace, all running in the browser with no backend required.

---

## The Problem It Solves

Online shopping shouldn't be complicated. Karibu was built to address:

- **Complex navigation** — Smart search and category filtering eliminate painful scrolling
- **Lack of transparency** — Real-time notifications keep customers informed about their orders
- **Poor user experience** — Clean, responsive design that works on every device
- **No order history** — Customers can track past purchases, receipts, and delivery status
- **Limited admin control** — A full admin dashboard for managing products and orders
- **Information gaps** — A built-in blog with guides, tips, and product recommendations

---

## Who's It For

| User | What They Get |
|------|---------------|
| **Shoppers** | Browse, search, filter, purchase, track orders, confirm delivery, read blog articles |
| **Store Admins** | Manage products, process orders, update delivery status, monitor sales |
| **Content Readers** | Access tech guides, product recommendations, and lifestyle articles via the blog |
| **Developers** | A clean, well-structured Next.js codebase to learn from or extend |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router) | React framework with file-based routing |
| **Language** | [TypeScript 5](https://typescriptlang.org) | Type-safe development |
| **UI Library** | [React 19](https://react.dev) | Component-based user interface |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) | Utility-first CSS framework |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs) | Lightweight state with localStorage persistence |
| **Icons** | [Lucide React](https://lucide.dev) | Beautiful, consistent icon library |
| **Build Tool** | [Turbopack](https://turbo.build) | Fast bundling for Next.js |

---

## Features & Capabilities

### Shopping Experience
- **Product Catalog** — Grid display with images, ratings, prices, and stock status
- **Smart Search** — Real-time product search by name, category, or badge
- **Category Filtering** — Browse by Home, Music, Phone, Storage, or All Products
- **Filter Options** — New Arrivals, Best Sellers, On Discount
- **Pagination** — Clean, navigable product listings

### Cart & Checkout
- **Shopping Cart** — Add, remove, update quantities with live totals
- **Tax Calculation** — Automatic 10% tax computation
- **Multiple Payment Methods** — Smart Card, Mobile Money, Cash on Delivery
- **Order Confirmation** — Full receipt with order reference and payment details

### User Account
- **Registration & Login** — Secure password-based authentication
- **Profile Management** — Edit name, email, and phone number
- **Password Change** — Update credentials with current password verification
- **Account Deletion** — Permanently remove account with password confirmation
- **Logout** — Secure session termination

### Notifications
- **Order Updates** — Real-time alerts when orders are approved, shipped, or delivered
- **Delivery Confirmation** — Customers confirm receipt of their orders
- **Admin Visibility** — Delivery confirmations sync to the admin dashboard
- **Read/Unread Tracking** — Mark individual or all notifications as read

### Order History
- **Purchase Timeline** — View all past orders with dates and statuses
- **Receipt Access** — Full itemized receipts for every order
- **Status Tracking** — Pending → Processing → Shipped → Delivered → Closed

### Admin Dashboard
- **Overview Stats** — Total products, pending orders, processing, delivered
- **Product Management** — Add, remove products with image upload
- **Order Processing** — Approve, ship, mark delivered, close orders
- **Receipt Viewer** — Expandable receipt details for each order

### Blog
- **Featured Articles** — Highlighted hero article with full content
- **Category Filtering** — Product Guides, Tech News, Home Security, Audio, Lifestyle
- **Search** — Find articles by title, excerpt, or tags
- **Full Article View** — Modal reader with author info, formatted content, and tags

### Design & UX
- **Fully Responsive** — Optimized for mobile, tablet, and desktop
- **Sticky Navigation** — Always-accessible navbar with cart badge and notification bell
- **Smooth Scrolling** — Search icon scrolls to hero search bar
- **Consistent Design Language** — Black/white minimalist aesthetic throughout

---

## How to Use

### As a Customer
1. **Browse** — Visit the homepage to see all products
2. **Search** — Click the search icon or type in the hero search bar
3. **Filter** — Use category sidebar or filter buttons to narrow results
4. **Add to Cart** — Click "Add to Cart" on any product
5. **Checkout** — Go to cart, select payment method, place order
6. **Track** — Check your account notifications for order updates
7. **Confirm** — Confirm delivery when your order arrives
8. **Read** — Visit the blog for tips, guides, and product recommendations

### As an Admin
1. **Login** — Go to `/admin` and enter credentials (`admin` / `1234`)
2. **Overview** — Check the dashboard for key metrics
3. **Manage Products** — Add new products or remove existing ones
4. **Process Orders** — Approve pending orders, mark as shipped/delivered
5. **Close Orders** — Close completed orders after customer confirmation

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 18+ installed
- npm, yarn, or pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/wakadala-star/Karibu_E-commerce.git

# Navigate to the frontend directory
cd Karibu_E-commerce/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Open in Browser

Visit [http://localhost:3000](http://localhost:3000)

### Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Customer | `demo@karibu.com` | `demo1234` |
| Admin | `admin` | `1234` |

---

## Project Structure

```
Karibu_E-commerce/
├── docs/                          # Project documentation
│   ├── app-flow.md
│   ├── business-logic.md
│   ├── product-requirements.md
│   └── technical-requirements.md
├── images/
│   └── UI_design/
│       └── e-commerce.jpeg        # UI design reference
└── frontend/                      # Next.js application
    ├── src/
    │   ├── app/                   # Pages (App Router)
    │   │   ├── page.tsx           # Home page
    │   │   ├── auth/page.tsx      # Login / Register
    │   │   ├── account/page.tsx   # User profile & settings
    │   │   ├── cart/page.tsx      # Shopping cart & checkout
    │   │   ├── blog/page.tsx      # Blog articles
    │   │   └── admin/
    │   │       ├── page.tsx       # Admin login
    │   │       └── dashboard/     # Admin dashboard
    │   ├── components/            # Reusable UI components
    │   ├── data/                  # Static data (products, blog)
    │   ├── store/                 # Zustand state management
    │   └── types/                 # TypeScript interfaces
    ├── public/images/             # Product & hero images
    ├── package.json
    └── tsconfig.json
```

---

## Frontend-Only Architecture

> **Important:** Karibu is a **purely frontend application**. There is no backend, no database, and no server-side API.

### How It Works
- **Authentication** — User credentials are stored in `localStorage` via Zustand's persist middleware
- **Data Persistence** — All products, orders, and user data persist in the browser's `localStorage`
- **State Management** — Zustand stores handle auth, cart, admin, and notifications state
- **No API Calls** — Everything runs client-side with no network requests to a backend

### What This Means
- Data is **per-browser** — each user has their own isolated data
- Data is **not shared** between users or devices
- Data is **lost** if the browser cache is cleared
- There is **no real-time sync** between admin and customer

### Backend Integration Roadmap
To make Karibu production-ready, the following backend integration is needed:
- RESTful or GraphQL API with proper authentication (JWT/NextAuth.js)
- PostgreSQL database with Prisma ORM
- Redis for session caching
- File storage (AWS S3 / Cloudinary) for product images
- Payment gateway integration (Stripe, Paystack)
- Real-time notifications via WebSockets
- Email notifications for order updates

---

## Future Implementations

| Feature | Description |
|---------|-------------|
| **Backend API** | Node.js/Express or Next.js API routes with authentication |
| **Database** | PostgreSQL with Prisma ORM for persistent data storage |
| **Real Authentication** | NextAuth.js with JWT tokens and secure sessions |
| **Payment Integration** | Stripe, Paystack, or Flutterwave for real payments |
| **Product Detail Pages** | Individual product pages with reviews and related items |
| **Wishlist** | Save products for later with wishlist functionality |
| **User Reviews** | Rating and review system for purchased products |
| **Email Notifications** | Automated order confirmations and shipping updates |
| **Inventory Management** | Real-time stock tracking with low-stock alerts |
| **Coupon System** | Discount codes and promotional offers |
| **Multi-language** | English, Swahili, and French language support |
| **Dark Mode** | Theme toggle for light/dark appearance |
| **Mobile App** | React Native or Flutter companion application |
| **Analytics Dashboard** | Sales charts, conversion rates, and customer insights |
| **SEO Optimization** | Meta tags, structured data, and sitemap generation |
| **Accessibility** | WCAG 2.1 compliance for inclusive design |

---

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Guidelines
- Follow the existing code style and conventions
- Write meaningful commit messages
- Test your changes before submitting
- Update documentation if needed
- Be respectful and constructive in discussions

---

## Remarks

> *To every junior developer reading this — keep building.*

*The fact that you're reading through a codebase, studying how things work, and wanting to contribute tells me everything I need to know about you. You're already ahead of most.*

*Don't wait until you "know enough" to start building. You'll never feel ready. The best way to learn is to break things, fix them, and build something new tomorrow. Every project you complete — no matter how small — teaches you something that no tutorial ever will.*

*The tech world moves fast, but fundamentals don't change. Learn JavaScript deeply. Understand how the web works. Master one framework before jumping to the next. Build projects that solve real problems for real people.*

*Remember: every senior developer was once exactly where you are now. The only difference between those who made it and those who didn't is that the ones who made it **never stopped shipping code**.*

*So open that editor, create that branch, and build something the world needs. The world is waiting for what only you can create.*

*— Keep pushing. Keep learning. Keep building.*

---

## Author

**Mark Wakadala**

[![GitHub](https://img.shields.io/badge/GitHub-wakadala--star-181717?logo=github)](https://github.com/wakadala-star)
[![Portfolio](https://img.shields.io/badge/Portfolio-Mark_Wakadala-00C853)](https://github.com/wakadala-star)

Built with passion and purpose.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**If you found this project helpful, give it a ⭐ on GitHub!**

Made with ❤️ by [Mark Wakadala](https://github.com/wakadala-star)

</div>
