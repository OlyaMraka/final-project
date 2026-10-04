# Educational CRM System (Fullstack Application)

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Express](https://img.shields.io/badge/Express-5.x-black.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen.svg)
![React](https://img.shields.io/badge/React-19.x-61DAFB.svg)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.x-purple.svg)
![Swagger](https://img.shields.io/badge/Swagger-OpenAPI%203.0-85EA2D.svg)

> A modern, full-featured CRM system for educational centers designed to manage course applications, distribute workloads among managers, track real-time analytics, generate Excel reports, and provide comprehensive team administration.

---

## 1. Project Overview & Features

This system streamlines sales department operations and applications management for educational organizations. It implements role-based access control (**Admin** and **Manager**), secure authentication, real-time application table interactions, email flows, and a dedicated administrative dashboard.

### Key Features:

#### Authentication & Security
- **Dual JWT Token Architecture (Access & Refresh):** Secure token storage in MongoDB with automatic 401 interception and token refresh mechanisms on the client (Axios Interceptors).
- **Role-Based Access Control (RBAC):** Distinct permission levels separating Administrators and Managers.
- **Background Cron Jobs:** Automated daily database cleanup tasks that purge expired tokens.
- **Password Hashing:** Industry-standard password hashing with `bcrypt` (12 salt rounds).

#### Applications Management Module
- **Dynamic Application Table:** Interactive applications table with expandable row details, custom comments, and metadata history.
- **URL-Synchronized Filtering:** Filter applications by name, surname, email, phone, age, course, tariff, format, status, group, creation date range, or toggle "My applications". All filters synchronize seamlessly with `URL SearchParams`.
- **Debounced Search:** 500ms input debounce prevents server request flooding during text input.
- **Sorting & Pagination:** Bidirectional column sorting (ASC/DESC) on any field combined with server-side pagination.
- **Flexible Application Editing:** Ability to update or clear application fields (supports optional/empty values according to business specifications).
- **Manager Assignment:** Automatic assignment upon adding the first comment.
- **Excel Report Export (.xlsx):** Dynamic spreadsheet generation and download based on active filters powered by `ExcelJS`.

#### Comments Module
- Add, update, and delete comments for each specific application.
- Automatically claims unassigned applications when a manager posts a comment.

#### Admin Dashboard
- **Manager Management:** Create new manager accounts, browse paginated manager lists, and toggle account states (`Ban` / `Unban`).
- **Email Activation & Password Recovery:** Automated email dispatch with secure tokens for password setup and account recovery via `Nodemailer` + `Handlebars`.

#### Interactive API Documentation
- Complete, modular OpenAPI 3.0 / Swagger documentation with built-in `Bearer Token` authorization support accessible at `/docs`.

---

## 2. Technologies Used

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (v18+)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [Express.js](https://expressjs.com/) (v5)
- **Database:** [MongoDB](https://www.mongodb.com/) (via [Mongoose](https://mongoosejs.com/) ODM)
- **Validation:** [Joi](https://joi.dev/)
- **Security & Auth:** [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken), [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Email Engine:** [Nodemailer](https://nodemailer.com/), [Handlebars](https://handlebarsjs.com/)
- **Spreadsheet Generation:** [ExcelJS](https://github.com/exceljs/exceljs)
- **Scheduled Tasks:** [cron](https://github.com/kelektiv/node-cron)
- **API Documentation:** [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express), [openapi-types](https://github.com/kogosoftwarellc/open-api)

### Frontend
- **Framework & Build Tool:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & [React-Redux](https://react-redux.js.org/)
- **Routing:** [React Router DOM v7](https://reactrouter.com/)
- **Form Handling & Validation:** [React Hook Form](https://react-hook-form.com/), [@hookform/resolvers](https://github.com/react-hook-form/resolvers), [Joi](https://joi.dev/)
- **UI Components & Icons:** [Material-UI (MUI)](https://mui.com/), `@mui/icons-material`, `@mui/x-date-pickers`
- **HTTP Client:** [Axios](https://axios-http.com/) (with custom Request & Response Interceptors)
- **Date Utilities:** [Dayjs](https://day.js.org/)

---

## 3. Environment Variables Configuration (`.env`)

To run the application, configure two `.env` files: one in the `backend/` directory and one in the `frontend/` directory.

### Backend (`backend/.env`)

| Variable | Example Value | Description |
| :--- | :--- | :--- |
| `PORT` | `7000` | Port on which the Express server listens. |
| `MONGO_URL` | `mongodb://localhost:27017/crm_db` | MongoDB connection URI. |
| `FRONTEND_URL` | `http://localhost:5173` | Frontend application URL for CORS configuration. |
| `BACKEND_API_URL` | `http://localhost:7000` | Base backend API URL. |
| `ACCESS_TOKEN_SECRET` | `super_secret_access_jwt_key_123` | Secret key used to sign Access JWTs. |
| `REFRESH_TOKEN_SECRET` | `super_secret_refresh_jwt_key_456` | Secret key used to sign Refresh JWTs. |
| `ACTIVATION_TOKEN_SECRET`| `super_secret_activation_jwt_key_789` | Secret key used for account activation & recovery tokens. |
| `JWT_ACCESS_LIFETIME` | `15 minutes` | Access token lifespan (e.g., `15m`, `1h`). |
| `JWT_REFRESH_LIFETIME` | `30 minutes` | Refresh token lifespan (format: `value unit`, e.g., `30 days`). |
| `ACTIVATION_LIFETIME` | `30 minutes` | Expiration time for password setup links. |
| `EMAIL_USER` | `your-email@gmail.com` | Gmail / Google Workspace address for sending emails. |
| `EMAIL_PASSWORD` | `xxxx xxxx xxxx xxxx` | Google Account App Password. |

#### Example `backend/.env`:
```env
PORT=7000
MONGO_URL=mongodb://localhost:27017/crm_db
FRONTEND_URL=http://localhost:5173
BACKEND_API_URL=http://localhost:7000

ACCESS_TOKEN_SECRET=your_access_token_secret_key_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key_here
ACTIVATION_TOKEN_SECRET=your_activation_token_secret_key_here

JWT_ACCESS_LIFETIME=15m
JWT_REFRESH_LIFETIME=30 days
ACTIVATION_LIFETIME=30m

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

---

### Frontend (`frontend/.env`)

| Variable | Example Value | Description |
| :--- | :--- | :--- |
| `VITE_API_URL` | `http://localhost:7000` | Base API URL for client-side Axios requests. |

#### Example `frontend/.env`:
```env
VITE_API_URL=http://localhost:7000
```

---

## 4. Local Installation & Setup Guide

### Prerequisites
Ensure you have the following installed on your local machine:
- **Node.js** (`v18.0.0` or higher)
- **npm** or **yarn**
- **MongoDB** (local instance or cloud cluster via [MongoDB Atlas](https://www.mongodb.com/atlas))

---

### Clone the Repository
```bash
git clone https://github.com/your-username/final-project.git
cd final-project
```

---

### Backend Setup & Execution

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create and configure your `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Start the backend development server:
   ```bash
   npm start
   ```

> **Automatic Database Seeding:**  
> Upon the initial database connection, the server automatically executes seeders that create:
> - The default master administrator account (**Admin**).
> - 15 sample student groups.
> - 500 mock application records with randomized statuses, formats, and pricing tiers.

---

### Frontend Setup & Execution

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file:
   ```bash
   echo "VITE_API_URL=http://localhost:7000" > .env
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to: **`http://localhost:5173`**

---

## 5. Default Admin Credentials

After automatic seeding, log in using the pre-configured administrator credentials:

- **Email:** `admin@gmail.com`
- **Password:** `admin`
- **Role:** `admin`

---

## 6. Interactive Swagger API Documentation

Once the backend is running, open the interactive Swagger UI directly in your browser:

**[http://localhost:7000/docs](http://localhost:7000/docs)**

From the Swagger UI, you can:
1. Inspect all endpoint routes (`Auth`, `Users`, `Applications`, `Application comments`, `Groups`).
2. Review request/response schemas and DTO models.
3. Click **Authorize**, paste your Access Token, and test authenticated endpoints in real time.

---

## 7. Project Directory Structure

```text
final-project/
├── backend/
│   ├── src/
│   │   ├── configs/         # Environment configurations (dotenv)
│   │   ├── constants/       # Error messages, email subjects, template names
│   │   ├── controllers/     # HTTP request controllers
│   │   ├── crons/           # Scheduled background jobs (token cleanup)
│   │   ├── docs/            # Modular OpenAPI 3.0 / Swagger definitions
│   │   ├── dtos/            # Data Transfer Objects & response types
│   │   ├── enums/           # System enumerations (roles, statuses, tariffs)
│   │   ├── errors/          # Custom ApiError class
│   │   ├── helpers/         # Time and utility helpers
│   │   ├── interfaces/      # TypeScript entity interfaces
│   │   ├── middleware/      # Auth, permission, and validation middlewares
│   │   ├── models/          # Mongoose schemas and database models
│   │   ├── repositories/    # Data Access Layer (DAL)
│   │   ├── routers/         # Express API routers
│   │   ├── seeders/         # Database seeders (Admin, Groups, Leads)
│   │   ├── services/        # Business logic (Auth, User, Email, Excel)
│   │   ├── templates/       # Handlebars (.hbs) email templates
│   │   ├── validators/      # Joi input validation schemas
│   │   └── main.ts          # Server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── assets/          # Static logos and graphic assets
    │   ├── components/      # UI components (tables, filters, admin, forms)
    │   ├── enums/           # Frontend enumerations
    │   ├── helpers/         # URL search param extraction helpers
    │   ├── layouts/         # Page layouts (MainLayout, HomeLayout)
    │   ├── pages/           # Pages (SignIn, HomePage, AdminPage, SetPassword)
    │   ├── redux/           # Redux Store, custom hooks, and 5 state slices
    │   ├── routers/         # React Router DOM configuration
    │   ├── services/        # Axios API clients and interceptors
    │   ├── types/           # TypeScript types and component prop interfaces
    │   ├── validators/      # Client-side Joi form schemas
    │   └── main.tsx         # Frontend application entry point
    └── package.json
```

---

## 👩‍💻 Author
Developed as a graduation project for the Fullstack Web Development course.
