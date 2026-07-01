# Business Logic Document

## 1. Inventory Management Logic

### Stock Deduction Flow
```
Order Placed → Validate Stock → Deduct Stock → Confirm Order
                                    ↓
                              Stock < Threshold?
                                    ↓
                              Yes → Send Low Stock Alert
```

### Stock Validation Rules
1. Check if product is active
2. Verify requested quantity <= available stock
3. Deduct stock atomically (transaction)
4. If stock < 10 after deduction, trigger low stock alert

### Concurrency Handling
- Use database transactions for stock updates
- Optimistic locking with version field
- Redis cache for real-time availability checks

## 2. Cart Management Logic

### Cart Rules
- Maximum 99 items per product
- Cart expires after 30 days
- Stock validation on cart load
- Price locked at add-to-cart time (optional)

### Cart Calculations
```
Subtotal = Σ (product_price × quantity)
Tax = Subtotal × tax_rate
Total = Subtotal + Tax
```

## 3. Order Processing Logic

### Order States
```
pending → confirmed → processing → shipped → delivered
    ↓
cancelled
```

### Order Validation
1. Verify all items in stock
2. Validate shipping address
3. Calculate total with taxes
4. Generate order reference number

### Order Reference Format
```
ORD-{YYYYMMDD}-{RANDOM6DIGITS}
Example: ORD-20260701-A3F8K2
```

## 4. Pricing Logic

### Price Calculation
- Base price from product
- Quantity discounts (future)
- Tax calculation based on location
- Shipping cost (future)

### Currency Handling
- Store prices in cents (avoid floating point)
- Display formatted with currency symbol
- Support multiple currencies (future)

## 5. Receipt/Payslip Generation

### Receipt Data
```
- Order reference number
- Date and time
- Customer details
- Itemized list (product, qty, price)
- Subtotal, tax, total
- Delivery address
- Verification code (QR code)
```

### Verification Flow
1. Delivery person scans QR code
2. System validates order ID
3. Confirms delivery status
4. Generates delivery confirmation

## 6. Location Services Logic

### Location Detection
```
User grants permission → Get coordinates → Reverse geocode → Store address
```

### Delivery Estimation
```
Customer location + Warehouse location → Calculate distance
                                        → Apply delivery rules
                                        → Return estimated days
```

### Delivery Rules (Basic)
- Same city: 1-2 days
- Same state: 3-5 days
- Different state: 5-7 days
- Remote areas: 7-10 days

## 7. Search & Filter Logic

### Search Algorithm
- Full-text search on name, description
- Fuzzy matching for typo tolerance
- Search by category
- Search by price range

### Filter Logic
```
Products WHERE
  category = ? (optional)
  AND price BETWEEN ? AND ? (optional)
  AND stock_quantity > 0 (optional)
  AND is_active = true
ORDER BY ? (relevance, price, date)
```

## 8. Real-Time Updates Logic

### Stock Updates
- WebSocket connection for live updates
- When stock changes, broadcast to all connected clients
- Optimistic UI updates with rollback on error

### Update Flow
```
Admin updates stock → Save to DB → Publish to Redis
                                     ↓
                              WebSocket broadcast
                                     ↓
                              Client updates UI
```

## 9. Error Handling Logic

### Business Rule Violations
- Insufficient stock → Show "Out of Stock" message
- Price mismatch → Redirect to product page
- Invalid quantity → Validate on input

### Recovery Actions
- Cart item out of stock → Mark as unavailable
- Order fails → Restore stock
- Payment fails → Cancel order, notify user
