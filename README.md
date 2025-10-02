# Next.js MongoDB Customer Management App

A full-stack web application built with **Next.js 14** and **MongoDB** featuring complete CRUD operations for customer management.

## 🚀 Features

### Customer Management System

- ✅ **List all customers** - View customers in a responsive table
- ✅ **Add new customers** - Create customers with validation
- ✅ **Update existing customers** - Edit customer information
- ✅ **Delete customers** - Remove customers with confirmation
- ✅ **Customer detail pages** - View individual customer details
- ✅ **Interactive UI** - Click table rows to view details

### Technical Features

- 🎨 **Material-UI (MUI)** components for modern design
- 📱 **Responsive design** that works on all devices
- ⚡ **Real-time updates** with React state management
- 🔒 **Form validation** and error handling
- 🔄 **Loading states** and user feedback
- 🎯 **RESTful API endpoints** for all CRUD operations

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React, Material-UI (MUI)
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Material-UI + Tailwind CSS
- **Package Manager**: pnpm

## 📋 Customer Data Model

```javascript
{
  name: String (required),
  dateOfBirth: Date (required),
  memberNum: Number (required),
  interests: String (required)
}
```

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Development Server

```bash
pnpm dev
```

### 4. Access the Application

- Main app: http://localhost:3000
- Customer management: http://localhost:3000/customer

## 📡 API Endpoints

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| GET    | `/api/customer`      | Get all customers     |
| POST   | `/api/customer`      | Create new customer   |
| GET    | `/api/customer/[id]` | Get customer by ID    |
| PUT    | `/api/customer/[id]` | Update customer by ID |
| DELETE | `/api/customer/[id]` | Delete customer by ID |

## 🧪 Testing APIs with cURL

### Create a customer:

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"John Doe","dateOfBirth":"1990-01-15","memberNum":123,"interests":"Reading, Gaming"}' \
  http://localhost:3000/api/customer
```

### Update a customer:

```bash
curl -X PUT -H "Content-Type: application/json" \
  -d '{"name":"John Smith","dateOfBirth":"1990-01-15","memberNum":123,"interests":"Reading, Gaming, Coding"}' \
  http://localhost:3000/api/customer/CUSTOMER_ID
```

### Get all customers:

```bash
curl http://localhost:3000/api/customer
```

### Delete a customer:

```bash
curl -X DELETE http://localhost:3000/api/customer/CUSTOMER_ID
```

## 📱 Application Structure

```
app/
├── customer/                 # Customer management pages
│   ├── page.js              # Customer list with CRUD operations
│   └── [id]/                # Customer detail pages
│       └── page.js          # Individual customer details
├── api/
│   └── customer/            # Customer API routes
│       ├── route.js         # GET all, POST new
│       └── [id]/
│           └── route.js     # GET, PUT, DELETE by ID
└── models/
    └── Customer.js          # MongoDB customer schema
```

## 🎯 Key Features Demonstrated

1. **Full-Stack Architecture**: Next.js serving both frontend and backend
2. **MongoDB Integration**: Mongoose ODM for database operations
3. **RESTful API Design**: Proper HTTP methods and status codes
4. **Modern React Patterns**: Hooks, state management, and component composition
5. **Material-UI Integration**: Professional UI components and theming
6. **Form Handling**: Validation, error states, and user feedback
7. **Responsive Design**: Mobile-first approach with Material-UI Grid system

## 👤 Author

Built by **pmnoia** as part of a web application development course.

---

_This project demonstrates modern full-stack web development practices using Next.js, React, and MongoDB._
