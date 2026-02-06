# Skaviyo - Full-Stack Application with Clean Architecture

A production-ready full-stack application scaffold following Clean Architecture principles.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      SKAVIYO APP                            │
├─────────────────┬─────────────────────┬───────────────────┤
│   BACKEND       │     FRONTEND        │    MOBILE APP     │
│  (Node.js)     │    (Next.js)        │    (Flutter)      │
├─────────────────┼─────────────────────┼───────────────────┤
│  Clean          │  Clean-inspired     │  Clean            │
│  Architecture   │  Structure          │  Architecture     │
├─────────────────┼─────────────────────┼───────────────────┤
│ • Domain        │ • Domain            │ • Domain          │
│ • Application   │ • Infrastructure    │ • Data            │
│ • Infrastructure│ • Presentation      │ • Presentation    │
│ • Interface     │                     │                   │
└─────────────────┴─────────────────────┴───────────────────┘
```

---

## 📁 Project Structure

```
skaviyo/
├── backend/                 # Node.js + TypeScript API
│   ├── src/
│   │   ├── config/         # Environment configuration
│   │   ├── domain/         # Core business logic
│   │   │   └── user/       # User module
│   │   │       ├── entities/
│   │   │       ├── repositories/
│   │   │       └── use-cases/
│   │   ├── infrastructure/ # Data access implementation
│   │   │   └── user/
│   │   └── interface/      # HTTP handlers
│   │       ├── controllers/
│   │       ├── middleware/
│   │       └── routes/
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # Next.js + TypeScript
│   ├── src/
│   │   ├── domain/        # Domain models
│   │   │   └── models/
│   │   ├── infrastructure/# API services
│   │   │   └── api/
│   │   └── presentation/  # UI components & state
│   │       ├── components/
│   │       └── contexts/
│   ├── package.json
│   └── tsconfig.json
│
└── mobile_app/             # Flutter + Dart
    ├── lib/
    │   ├── domain/        # Business logic
    │   │   ├── entities/
    │   │   ├── repositories/
    │   │   └── usecases/
    │   ├── data/          # Data layer
    │   │   ├── repositories/
    │   │   └── services/
    │   └── presentation/  # UI & state
    │       ├── providers/
    │       └── screens/
    └── pubspec.yaml
```

---

## 🎯 Backend (Node.js + TypeScript)

### Layers

| Layer | Purpose | Examples |
|-------|---------|----------|
| **Domain** | Core business entities & rules | `User`, `UserRole`, `IUserRepository` |
| **Application** | Use cases & business logic | `UserUseCases`, `login`, `register` |
| **Infrastructure** | External concerns | `InMemoryUserRepository`, JWT signing |
| **Interface** | HTTP handlers | `UserController`, routes, middleware |

### Quick Start

```bash
cd backend
npm install
npm run dev
```

### API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/users/me` | Get current user | Required |
| GET | `/api/users` | List all users | Admin |
| PUT | `/api/users/:id` | Update user | Auth |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Sample Users (In-Memory)

| Email | Password | Role |
|-------|----------|------|
| admin@skaviyo.com | admin123 | Admin |
| vendor@skaviyo.com | vendor123 | Vendor |

---

## 💻 Frontend (Next.js)

### Structure

```
frontend/src/
├── domain/models/          # TypeScript interfaces
├── infrastructure/api/     # Axios service
└── presentation/
    ├── components/         # React components
    │   ├── ui/            # Shared UI (Button, Input)
    │   ├── auth/          # Auth forms, protected routes
    │   └── dashboards/    # Admin/Vendor dashboards
    └── contexts/          # React Context (Auth)
```

### Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/` | Home page | Public |
| `/login` | Login page | Public |
| `/dashboard` | Main dashboard | Authenticated |
| `/dashboard/users` | User management | Admin only |

### Quick Start

```bash
cd frontend
npm install
npm run dev
```

---

## 📱 Mobile App (Flutter)

### Clean Architecture Layers

```
mobile_app/lib/
├── domain/              # Business logic (pure Dart)
│   ├── entities/        # Data models
│   ├── repositories/    # Abstract interfaces
│   └── usecases/       # Business operations
├── data/               # Data layer
│   ├── repositories/   # Repository implementations
│   └── services/       # API services
└── presentation/      # UI layer
    ├── providers/      # State management
    └── screens/        # UI screens
```

### Features

- Login/Register with JWT auth
- State management with Provider
- REST API integration
- Role-based screens

### Quick Start

```bash
cd mobile_app
flutter pub get
flutter run
```

---

## 🔐 Authentication Flow

```
┌──────────┐    ┌─────────┐    ┌──────────────┐    ┌─────────┐
│  Client  │───►│  Login  │───►│   Backend    │───►│   JWT   │
│          │    │  Form   │    │   (Node.js) │    │  Token  │
└──────────┘    └─────────┘    └──────────────┘    └─────────┘
                                      │
                                      ▼
                               ┌──────────────┐
                               │   In-Memory  │
                               │   Database  │
                               └──────────────┘
```

---

## 🚀 Running the Full Stack

### 1. Start Backend

```bash
cd backend
npm install
npm run dev
# Server running on http://localhost:3000
```

### 2. Start Frontend

```bash
cd frontend
npm install
npm run dev
# Next.js running on http://localhost:3001
```

### 3. Start Mobile App

```bash
cd mobile_app
flutter pub get
flutter run
# iOS/Android simulator
```

---

## 📝 Environment Variables

### Backend (.env)

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
CORS_ORIGIN=http://localhost:3001
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_JWT_TOKEN_KEY=skaviyo_token
```

---

## 🛠️ Technologies Used

### Backend
- Node.js + TypeScript
- Express.js
- JWT Authentication
- In-memory database (replaceable)

### Frontend
- Next.js 14 (App Router)
- TypeScript
- React Context (Auth)
- Axios

### Mobile
- Flutter
- Dart
- Provider (State Management)
- HTTP

---

## 📄 License

MIT License
