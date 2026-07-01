# App Flow Document

## 1. Application Routes

```
/                        → Home page (featured products)
/products                → Product listing (all products)
/products/:id            → Product detail page
/cart                    → Shopping cart
/checkout                → Checkout process
/orders                  → Order history
/orders/:id              → Order detail
/account                 → User account (planned)
/admin                   → Admin dashboard (planned)
/admin/products          → Product management (planned)
/admin/orders            → Order management (planned)
```

## 2. User Flows

### 2.1 Customer Shopping Flow

```
┌─────────────┐
│  Home Page  │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│  Browse /   │────▶│   Search    │
│  Categories │     │   Results   │
└──────┬──────┘     └──────┬──────┘
       │                   │
       └─────────┬─────────┘
                 ▼
         ┌───────────────┐
         │ Product Detail│
         │     Page      │
         └───────┬───────┘
                 │
                 ▼
         ┌───────────────┐
         │  Add to Cart  │
         └───────┬───────┘
                 │
                 ▼
         ┌───────────────┐
         │     Cart      │
         │   Review      │
         └───────┬───────┘
                 │
                 ▼
         ┌───────────────┐
         │   Checkout    │
         │  - Address    │
         │  - Payment    │
         └───────┬───────┘
                 │
                 ▼
         ┌───────────────┐
         │ Order Success │
         │  + Receipt    │
         └───────────────┘
```

### 2.2 Product Search Flow

```
┌─────────────────────────────────────────┐
│              Search Bar                 │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         Real-time Suggestions           │
│  (debounced input, 300ms delay)        │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│          Search Results Page            │
│  ┌─────────────────────────────────┐   │
│  │ Filters: Category, Price, Stock │   │
│  └─────────────────────────────────┘   │
│  ┌─────────────────────────────────┐   │
│  │ Product Grid (infinite scroll)  │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### 2.3 Checkout Flow

```
┌───────────────┐
│ Cart Review   │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Enter Address │
│ + Location    │──── [Detect Location]
│   Detection   │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Order Summary │
│ - Items       │
│ - Subtotal    │
│ - Tax         │
│ - Total       │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Place Order   │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Confirmation  │
│ + Download    │
│   Receipt     │
└───────────────┘
```

### 2.4 Order Verification Flow (Delivery)

```
┌───────────────┐
│ Delivery Day  │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Customer Shows│
│ QR Code from  │
│ Receipt       │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Delivery Person│
│ Scans QR Code │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ System Verifies│
│ Order Details │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Mark as       │
│ Delivered     │
└───────────────┘
```

## 3. Page Components

### 3.1 Home Page
- Hero banner
- Featured products carousel
- Category grid
- New arrivals section
- Newsletter signup (future)

### 3.2 Product Listing Page
- Search bar with autocomplete
- Filter sidebar (category, price, availability)
- Product grid (responsive)
- Pagination / Infinite scroll
- Sort options (price, date, popularity)

### 3.3 Product Detail Page
- Image gallery with zoom
- Product title, description
- Price display
- Stock availability indicator
- Quantity selector
- Add to cart button
- Related products

### 3.4 Cart Page
- Cart items list
- Quantity adjustment
- Remove item button
- Cart summary (subtotal, tax, total)
- Proceed to checkout button
- Continue shopping link

### 3.5 Checkout Page
- Multi-step form or single page
- Shipping address form
- Location detection button
- Order summary
- Place order button

### 3.6 Order Confirmation Page
- Order reference number
- Order details
- Download receipt button
- Continue shopping button

## 4. Real-Time Features

### 4.1 Stock Updates
- WebSocket connection on product pages
- Visual indicator: "In Stock" (green), "Low Stock" (yellow), "Out of Stock" (red)
- Quantity selector disabled when out of stock

### 4.2 Cart Updates
- Immediate reflection of cart changes
- Badge counter on cart icon
- Toast notifications for actions

## 5. Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Specifics
- Bottom navigation bar
- Swipe gestures for product images
- Simplified filters
- Touch-friendly buttons

## 6. Loading States

### Skeleton Screens
- Product grid skeleton
- Product detail skeleton
- Cart skeleton

### Optimistic Updates
- Add to cart: Immediate feedback
- Quantity change: Immediate update
- Rollback on error

## 7. Error States

### Empty States
- No products found
- Empty cart
- No order history

### Error Pages
- 404 - Page not found
- 500 - Server error
- Network error toast
