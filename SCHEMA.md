# Database Schema (MongoDB)

## Overview
This document defines the database schema for the XSURFACE e-commerce platform using **MongoDB**.

---

## Products Collection

```javascript
{
  _id: ObjectId,
  code: String,          // Unique product code (e.g., "CODE12345678")
  name: String,          // Product display name
  price: Number,         // Current selling price
  originalPrice: Number, // Original price before discount (optional)
  discount: String,      // Discount text (e.g., "-50%")
  image: String,         // Product image URL
  dimensions: String,    // Product dimensions
  unit: String,          // Unit of measurement (default: "/ตร.ม.")
  inStock: Boolean,      // Stock availability
  isExclusive: Boolean,  // Exclusive product flag
  categoryId: ObjectId,  // Reference to categories collection
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
- `{ code: 1 }` - Unique index
- `{ name: "text", code: "text" }` - Text search index
- `{ categoryId: 1 }` - Category lookup

---

## Categories Collection

```javascript
{
  _id: ObjectId,
  name: String,    // Category display name
  icon: String,    // Icon identifier/emoji
  image: String,   // Category image URL
  order: Number    // Display order
}
```

---

## Cart Items Collection

```javascript
{
  _id: ObjectId,
  userId: ObjectId,    // Reference to users
  productId: ObjectId, // Reference to products
  quantity: Number,    // Quantity in cart (min: 1)
  createdAt: Date
}
```

### Indexes
- `{ userId: 1, productId: 1 }` - Compound unique index

---

## Relationships

```
Categories (1) ──────< Products (Many)
Users (1) ──────< CartItems (Many)
Products (1) ──────< CartItems (Many)
```
