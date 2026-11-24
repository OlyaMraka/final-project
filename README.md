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

## 3. Run Locally

### Prerequisites

- Node.js **20.19+** or **22.12+**, and npm. Vite 8 requires one of these Node versions.
- A reachable MongoDB instance: local MongoDB or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster.
- Git, if you need to clone the repository.

### 1. Get the project

If you have not already opened the project, clone its repository and enter the project directory:

```bash
git clone <repository-url>
cd final-project
```

Replace `<repository-url>` with the URL of this repository. If the project is already on your computer, open a terminal in its root directory instead.

### 2. Configure the backend

Create a file named `.env` inside the `backend/` folder. Add these variables and set the MongoDB connection string and token secrets for your setup:

```env
PORT=7000
MONGO_URL=mongodb://127.0.0.1:27017/educational_crm
ACCESS_TOKEN_SECRET=replace_with_a_long_random_secret
REFRESH_TOKEN_SECRET=replace_with_another_long_random_secret
ACTIVATION_TOKEN_SECRET=replace_with_a_third_long_random_secret
JWT_ACCESS_LIFETIME=15m
JWT_REFRESH_LIFETIME=30 days
ACTIVATION_LIFETIME=30m
FRONTEND_URL=http://localhost:5173
BACKEND_API_URL=http://localhost:7000
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASSWORD=your_google_app_password
```

Use a valid MongoDB connection string for `MONGO_URL`. The three token secrets should be long, random values and must each be different. Gmail credentials are needed for email delivery (manager activation and password recovery); the app can start without working email credentials, but those email flows will not send messages. To send email through Gmail, use a Google App Password, not your regular account password. Keep `.env` files private and never commit real credentials.

### 3. Install and start the backend

Keep the project root as your working directory, then run:

```bash
cd backend
npm install
npm run dev
```

The first run compiles the TypeScript backend and starts the API at `http://localhost:7000`. Leave this terminal open. The MongoDB server must be running and accessible before startup. If you prefer the production-style start command, run `npm run build` once, then `npm start` from `backend/`.

On its first connection to an empty database, the app seeds the admin account, 15 sample groups, and 500 sample applications. Existing admin and application data are retained; seeders do not reset the database.

### 4. Install and start the frontend

Create a file named `.env` inside the `frontend/` folder and add this variable:

```env
VITE_API_URL=http://localhost:7000
```

Then start Vite:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Keep both backend and frontend terminals running while using the app. If you change either `.env` file, restart its corresponding dev server.

### 5. Sign in and use the API docs

The seeded administrator credentials are:

- Email: `admin@gmail.com`
- Password: `admin`

Use these credentials for local development only. The interactive Swagger documentation is available at [http://localhost:7000/docs](http://localhost:7000/docs).

### Troubleshooting

- **MongoDB connection error:** Start MongoDB or check that `MONGO_URL` points to a reachable database.
- **Frontend cannot reach the API / CORS error:** Confirm the backend is running, `VITE_API_URL` is `http://localhost:7000`, and backend `FRONTEND_URL` matches the frontend origin. If Vite selected another port, update `FRONTEND_URL` to that exact origin and restart the backend.
- **Port already in use:** Stop the other process using port 7000 or 5173, or change the backend `PORT` and update `VITE_API_URL` and `BACKEND_API_URL` to match.
- **Email not delivered:** Verify `EMAIL_USER` and `EMAIL_PASSWORD`; for Gmail, use an App Password. Email delivery is only needed for account activation and password recovery.

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
