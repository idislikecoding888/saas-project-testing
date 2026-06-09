# SaaS Document Verification Platform Backend

A production-ready NestJS backend for a SaaS-based document verification platform with wallet management, API key authentication, role-based access control, staff management, pricing management, support tickets, Razorpay payments, and Nerotix document verification integration.

---

# Features

## Authentication & Users

* User Registration
* User Login
* JWT Authentication
* Customer Accounts
* Staff Accounts
* Super Admin Access

## Role-Based Access Control (RBAC)

* Permission Management
* Staff Permissions
* Protected Routes
* Granular Access Control

Supported Permissions:

* MANAGE_PRICING
* MANAGE_STAFF
* VIEW_USERS
* VIEW_TRANSACTIONS
* VIEW_SUPPORT
* VIEW_VERIFICATIONS
* MANAGE_API_KEYS
* REFUND_WALLET

---

# Wallet System

Each customer receives a wallet.

Features:

* Wallet Balance Tracking
* Credit Transactions
* Debit Transactions
* Transaction History
* Revenue Analytics

Minimum wallet balance supported.

---

# API Key System

Every customer can generate API keys.

Features:

* Multiple API Keys
* Active/Inactive Keys
* API Key Validation
* Verification Usage Tracking

API Keys are required for verification requests.

---

# Document Verification Services

Supported Services:

1. PAN Verification
2. GST Verification
3. Aadhaar OTP
4. DigiLocker Verification
5. Driving License Verification
6. Passport Verification
7. Voter ID Verification

Verification requests:

* Deduct wallet balance automatically
* Create transaction records
* Store verification history
* Store API responses
* Track success/failure status

Provider:

* Nerotix API

---

# Pricing Management

Each service has configurable pricing.

Supported:

* PAN_VERIFY
* GST_VERIFY
* AADHAAR_OTP
* DIGILOCKER
* DRIVING_LICENSE
* PASSPORT
* VOTER_ID

Super Admin can modify pricing dynamically.

Customers can view pricing publicly.

---

# Support System

Features:

* Create Support Tickets
* View User Tickets
* View All Tickets
* Update Ticket Status

Statuses:

* OPEN
* IN_PROGRESS
* RESOLVED

---

# Admin Dashboard

Admin Analytics:

* Total Users
* Total Staff
* Total Transactions
* Active API Keys
* Total Revenue
* Verification Statistics

Revenue Analytics:

* Total Credits
* Total Debits
* Profit

---

# Staff Management

Features:

* Create Staff Accounts
* Assign Permissions
* List Staff Members
* View Assigned Permissions

---

# Webhooks

Features:

* Create Webhooks
* Store Webhook URLs
* List User Webhooks

---

# Payment Gateway

Integrated with:

* Razorpay

Supported:

* Create Orders
* Wallet Topups

Webhook support available.

---

# Health Monitoring

Endpoint:

GET /health

Response:

```json
{
  "status": "ok",
  "service": "saas-backend"
}
```

---

# Technology Stack

Backend Framework:

* NestJS
* TypeScript

Database:

* PostgreSQL
* Prisma ORM

Authentication:

* JWT
* bcrypt

Payments:

* Razorpay

External Verification:

* Nerotix API

Security:

* Helmet
* ValidationPipe
* RBAC Permission Guards

---

# Project Structure

```text
src
├── admin
├── api-keys
├── auth
├── common
├── config
├── dashboard
├── permissions
├── pricing
├── prisma
├── razorpay
├── staff
├── support
├── transactions
├── users
├── verifications
├── wallet
├── webhooks
├── health
├── app.module.ts
└── main.ts
```

---

# Prerequisites

Install:

* Node.js 20+
* PostgreSQL 16+
* Docker Desktop (optional)
* Git

---

# Installation

Clone repository:

```bash
git clone <repository-url>
cd backend
```

Install dependencies:

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in project root.

Example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/saasdb"

JWT_SECRET=your_jwt_secret

PORT=3000

NEROTIX_BASE_URL=https://api.nerofy.in/api/v1
NEROTIX_TOKEN=your_nerotix_token

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```

---

# Database Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Push schema:

```bash
npx prisma db push
```

Open Prisma Studio:

```bash
npx prisma studio
```

---

# Running The Application

Development:

```bash
npm run start:dev
```

Production Build:

```bash
npm run build
```

Run Production:

```bash
npm run start:prod
```

---

# API Testing

Health Check:

```http
GET /health
```

Pricing:

```http
GET /pricing
```

Dashboard:

```http
GET /dashboard/:userId
```

Admin:

```http
GET /admin/overview
GET /admin/revenue
GET /admin/transactions
GET /admin/verifications
```

Support:

```http
POST /support/create
GET /support/all
```

Webhooks:

```http
POST /webhooks/create
GET /webhooks/user/:userId
```

Verifications:

```http
POST /verifications/pan
POST /verifications/gst
POST /verifications/aadhaar/send-otp
POST /verifications/digilocker
POST /verifications/driving-license
POST /verifications/passport
POST /verifications/voter-id
```

---

# Required Headers

Verification APIs require:

```http
x-api-key: YOUR_API_KEY
```

Permission-protected routes require:

```http
user-id: STAFF_OR_ADMIN_ID
```

---

# Development Workflow

1. Configure PostgreSQL
2. Configure .env
3. Run Prisma Generate
4. Run Prisma DB Push
5. Start NestJS Server
6. Open Prisma Studio
7. Create Users
8. Create API Keys
9. Configure Pricing
10. Test Verification APIs

---

# Production Checklist

* Configure PostgreSQL
* Configure Nerotix Credentials
* Configure Razorpay Credentials
* Configure Razorpay Webhook Secret
* Enable HTTPS
* Deploy Backend
* Configure Reverse Proxy
* Configure Monitoring

---
