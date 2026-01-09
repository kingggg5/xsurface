# XSURFACE - Premium Tile E-Commerce Platform
 
 A modern e-commerce platform for premium tiles and building materials, built with React and Node.js.

## Features

### Core Functionality
- **Product Catalog**: Browse 10+ premium tile products with images, pricing, and specifications
- **Product Search**: Real-time search by product name and code with instant filtering
- **Product Detail**: Individual product pages with full specifications and related items
- **Product Upload**: Admin form to add new products with image upload support
- **Responsive Design**: Fully responsive from mobile (390px) to desktop (1440px+)

### UI Components
- Hero banner with promotional content
- Category navigation with icons
- Product sliders with smooth horizontal scrolling
- Collections section with featured items
- Brand highlights and partner logos
- Sticky header with mobile menu

## Tech Stack

### Frontend
| Technology | Version | Expertise Level | Description |
|------------|---------|-----------------|-------------|
| React | 18.3 | Beginner | Component-based UI with hooks |
| TypeScript | 5.4 | Beginner | Type-safe development |
| Vite | 5.4 | Beginner | Fast build tool and dev server |
| Tailwind CSS | 3.4 | Beginner | Utility-first CSS framework |
| Lucide React | 0.429 | Beginner | Modern icon library |
| React Context API | - | Beginner | Global state management |

### Backend
| Technology | Version | Expertise Level | Description |
|------------|---------|-----------------|-------------|
| Node.js | 18+ | Intermediate | JavaScript runtime |
| Express.js | 4.x | Beginner | Web framework for API |
| MongoDB | 7.0 | Beginner | NoSQL database |
| Mongoose | 8.x | Beginner | MongoDB ODM |

### Architecture & Patterns
| Pattern | Expertise Level | Description |
|---------|-----------------|-------------|
| Clean Architecture | Intermediate | Separation of concerns with layers |
| Custom Hooks | Beginner | Reusable business logic (useProducts, useProductSearch) |
| Memoization | Beginner | React.memo and useMemo for performance |
| RESTful API | Beginner | Standard HTTP methods for CRUD |

## Project Structure

```
xsurface-clone/
├── application/           # Application layer (hooks, contexts)
│   ├── hooks/            # Custom React hooks
│   └── contexts/         # React Context providers
├── components/           # UI components
│   └── sections/         # Page sections (Hero, Collections, etc.)
├── pages/                # Page components
├── infrastructure/       # External services layer
│   └── database/         # MongoDB models
├── server/               # Express.js backend
│   └── routes/           # API routes
├── types.ts              # TypeScript type definitions
└── App.tsx               # Main application entry
```

## Database Schema

### Product Collection
```javascript
{
  _id: ObjectId,
  code: String (unique),      // Product code e.g., "FUV-SLV-001"
  name: String (required),    // Product name in Thai/English
  price: Number (required),   // Current price in THB
  originalPrice: Number,      // Original price before discount
  discount: String,           // Discount percentage e.g., "-50%"
  image: String (required),   // Product image URL
  dimensions: String,         // Size specifications
  unit: String,               // Pricing unit e.g., "/ตร.ม."
  inStock: Boolean,           // Stock availability
  isExclusive: Boolean,       // Exclusive product flag
  createdAt: Date,            // Auto-generated timestamp
  updatedAt: Date             // Auto-generated timestamp
}
```

## Installation

### Prerequisites
- Node.js 18 or higher
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Steps

1. Clone the repository
```bash
git clone https://github.com/your-username/xsurface-clone.git
cd xsurface-clone
```

2. Install dependencies
```bash
npm install
```

3. Configure environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your MongoDB connection string:
```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/xsurface
PORT=3001
```

4. Start the development servers

Terminal 1 - Backend:
```bash
npm run server
```

Terminal 2 - Frontend:
```bash
npm run dev
```

5. Seed the database (optional)
```bash
curl -X POST http://localhost:3001/api/products/seed
```

6. Open the application
```
http://localhost:5173
```

## API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products | List all products with pagination |
| GET | /products/:id | Get single product by ID |
| POST | /products | Create new product |
| PUT | /products/:id | Update product |
| DELETE | /products/:id | Delete product |
| POST | /products/seed | Seed database with sample data |

### Query Parameters (GET /products)
| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search by name or code |
| inStock | boolean | Filter by stock status |
| isExclusive | boolean | Filter exclusive products |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |

### Example Request
```bash
GET /api/products?search=marble&inStock=true&page=1&limit=10
```

## Build & Deploy

### Build for Production
```bash
npm run build
```

### Output
- Frontend: `dist/` folder (static files)
- Backend: Deploy `server/` folder to Node.js hosting

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Railway, Render, or Heroku
- **Database**: MongoDB Atlas (cloud)

## Requirements Checklist

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| ReactJS/NextJS | ✅ | React 18 with Vite |
| Frontend Framework | ✅ | Tailwind CSS |
| Search by Name/Code | ✅ | useProductSearch hook |
| Product Detail Page | ✅ | ProductDetailPage.tsx |
| Database Schema | ✅ | MongoDB with Mongoose |
| API Integration | ✅ | Express.js REST API |
| Deployment Ready | ✅ | Build scripts configured |

## License

MIT License

## Author

Developed as a technical assessment project demonstrating full-stack development skills with React, Node.js, and MongoDB.
