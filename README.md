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

Throughout the development of this project, I leveraged AI tools extensively to accelerate development, improve code quality, and learn best practices. Here's a detailed breakdown:

### AI Tools Used

1. **Cursor AI (Primary Assistant)**
   - Used for generating boilerplate code for models, controllers, and services
   - Assisted with TypeScript type definitions and interfaces
   - Helped with test case generation following TDD principles
   - Generated API route structures and middleware implementations
   - Created React components with proper TypeScript typing
   - Assisted with Tailwind CSS styling and responsive design patterns

2. **GitHub Copilot (Code Completion)**
   - Provided intelligent code completions while writing tests
   - Suggested test cases and edge cases I might have missed
   - Helped with error handling patterns
   - Assisted with form validation logic

### How AI Was Used

#### Backend Development
- **Database Models**: AI helped generate the initial structure for User and Sweet models with proper TypeScript interfaces
- **Service Layer**: Used AI to create service classes following SOLID principles, with proper error handling
- **Test Generation**: AI generated comprehensive test suites for models, services, and routes, helping me achieve high test coverage
- **Authentication**: AI assisted with JWT implementation, password hashing patterns, and middleware creation
- **API Routes**: Generated route structures with proper validation and error handling

#### Frontend Development
- **Component Structure**: AI helped design reusable React components with proper prop typing
- **State Management**: Assisted with Zustand store setup and persistence configuration
- **Form Handling**: Generated form validation schemas using Zod and React Hook Form integration
- **UI Design**: AI suggested modern UI patterns including glassmorphism effects, animations, and responsive layouts
- **API Integration**: Helped structure API client with proper TypeScript types and error handling

#### Code Quality
- **Type Safety**: AI ensured consistent TypeScript usage throughout the codebase
- **Error Handling**: Suggested comprehensive error handling patterns
- **Code Organization**: Helped structure the project following best practices

### Reflection on AI Impact

**Positive Impacts:**
1. **Speed**: Development was significantly faster, especially for boilerplate code and repetitive patterns
2. **Learning**: AI suggestions helped me learn new patterns and best practices
3. **Quality**: AI caught potential bugs and suggested improvements I might have missed
4. **Consistency**: AI helped maintain consistent coding style across the project
5. **Testing**: AI-generated tests helped achieve comprehensive coverage and catch edge cases

**Challenges:**
1. **Review Required**: AI-generated code always needed careful review and sometimes refactoring
2. **Context Understanding**: Sometimes AI suggestions didn't perfectly match the project context
3. **Over-reliance Risk**: Had to ensure I understood the code, not just copy-paste

**Best Practices Followed:**
- Always reviewed and understood AI-generated code before committing
- Used AI for inspiration but implemented custom logic where needed
- Tested all AI-generated code thoroughly
- Maintained clear commit messages documenting AI assistance
- Ensured all code follows project standards and requirements

### Ethical Considerations

- All AI-generated code was reviewed, tested, and customized for this project
- No code was directly copied from other repositories
- AI was used as a tool to enhance productivity, not replace understanding
- All commits properly attribute AI assistance as co-author
- The final codebase represents my understanding and implementation of the requirements

## 📝 License

MIT

