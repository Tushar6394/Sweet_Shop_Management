# 🍬 Sweet Shop Management System

A full-stack application for managing a sweet shop with inventory tracking, user authentication, and a modern, responsive frontend.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Sweets Management**: CRUD operations for managing sweet products
- **Inventory Tracking**: Purchase and restock functionality with real-time quantity updates
- **Search & Filter**: Find sweets by name, category, or price range
- **Admin Controls**: Special permissions for admin users to manage inventory
- **Modern UI**: Beautiful, responsive design built with React and Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Testing**: Jest with Supertest

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router
- **Form Handling**: React Hook Form with Zod validation

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sweet-shop-management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/sweet_shop_db
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Create the database:

```bash
createdb sweet_shop_db
```

Run migrations:

```bash
npm run migrate up
```

Start the development server:

```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

For coverage:

```bash
npm run test:coverage
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets
- `POST /api/sweets` - Create a new sweet (Admin)
- `PUT /api/sweets/:id` - Update a sweet (Admin)
- `DELETE /api/sweets/:id` - Delete a sweet (Admin)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase` - Purchase a sweet
- `POST /api/sweets/:id/restock` - Restock a sweet (Admin)

## 📸 Screenshots

_To be added after implementation_

## 🤖 My AI Usage

_This section will be completed after development to document AI tool usage throughout the project._

## 📝 License

MIT

