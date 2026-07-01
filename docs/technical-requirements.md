# Technical Requirements Document

## 1. Tech Stack

### Frontend
- **Framework**: React 18+ with Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API + Zustand (for cart)
- **UI Components**: shadcn/ui or Radix UI

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes / Route Handlers
- **Database**: PostgreSQL (via Prisma ORM)
- **Cache**: Redis (for real-time stock updates)
- **Authentication**: NextAuth.js (planned)

### Third-Party Services
- **Maps/Location**: Google Maps API or Mapbox
- **PDF Generation**: jsPDF or React-PDF
- **Image Storage**: Cloudinary or AWS S3
- **Email**: SendGrid (planned)
- **Payment**: Stripe (planned)

## 2. System Architecture

```
┌─────────────────────────────────────────────┐
│              Client (Browser)               │
│         React + Next.js (SSR/SSG)          │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│            Next.js API Layer                │
│         Route Handlers (REST API)           │
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌──────────────┐    ┌──────────────┐
│  PostgreSQL  │    │    Redis     │
│   (Prisma)   │    │    (Cache)   │
└──────────────┘    └──────────────┘
```

## 3. Database Schema (Core)

### Products Table
- id (UUID)
- name (String)
- description (Text)
- price (Decimal)
- image_url (String)
- category_id (UUID FK)
- stock_quantity (Integer)
- is_active (Boolean)
- created_at (Timestamp)
- updated_at (Timestamp)

### Categories Table
- id (UUID)
- name (String)
- description (String)
- created_at (Timestamp)

### Orders Table
- id (UUID)
- user_id (UUID FK)
- total_amount (Decimal)
- status (Enum: pending, confirmed, delivered, cancelled)
- shipping_address (JSON)
- customer_location (JSON)
- created_at (Timestamp)
- updated_at (Timestamp)

### Order Items Table
- id (UUID)
- order_id (UUID FK)
- product_id (UUID FK)
- quantity (Integer)
- unit_price (Decimal)

### Cart Table
- id (UUID)
- user_id (UUID FK)
- product_id (UUID FK)
- quantity (Integer)
- created_at (Timestamp)

## 4. API Endpoints

### Products
- GET /api/products - List products (with search/filter)
- GET /api/products/:id - Get product details
- POST /api/products - Create product (admin)
- PUT /api/products/:id - Update product (admin)
- DELETE /api/products/:id - Delete product (admin)
- GET /api/products/:id/stock - Get real-time stock

### Cart
- GET /api/cart - Get user cart
- POST /api/cart - Add to cart
- PUT /api/cart/:id - Update cart item
- DELETE /api/cart/:id - Remove from cart

### Orders
- POST /api/orders - Create order
- GET /api/orders - Get user orders
- GET /api/orders/:id - Get order details
- PUT /api/orders/:id/status - Update order status

### Location
- POST /api/location/detect - Detect user location
- GET /api/location/delivery-estimate - Get delivery estimate

## 5. Performance Requirements

- **Initial Load**: < 2 seconds (LCP)
- **Search Response**: < 500ms
- **Stock Updates**: < 1 second (WebSocket)
- **Lighthouse Score**: > 90
- **Bundle Size**: < 200KB (initial)

## 6. Security Requirements

- HTTPS enforced
- CSRF protection
- Input sanitization
- Rate limiting on API endpoints
- Secure session management
- SQL injection prevention (Prisma handles)

## 7. Development Setup

```bash
# Package Manager
pnpm (recommended)

# Environment Variables
DATABASE_URL
REDIS_URL
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
JWT_SECRET
```

## 8. Testing Strategy

- Unit Tests: Vitest
- Integration Tests: Vitest + Testing Library
- E2E Tests: Playwright
- API Tests: Supertest
