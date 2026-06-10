# SaaS Document Verification Platform

Production-ready SaaS backend for KYC, document verification, business verification, telecom intelligence, vehicle intelligence, wallet management, API key authentication, role-based access control (RBAC), staff management, pricing management, support tickets, webhooks, analytics, and Razorpay wallet top-ups.

Built using NestJS, Prisma, PostgreSQL, and Nerotix APIs.

---

# Overview

This platform allows businesses, developers, fintech companies, HR platforms, logistics companies, and verification providers to perform real-time identity verification and business verification through a single API.

The system provides:

* User Authentication
* Wallet-Based Billing
* API Key Management
* Verification History
* Usage Analytics
* Pricing Management
* Staff Permissions
* Admin Dashboard
* Webhook Support
* Razorpay Wallet Funding
* Nerotix API Integrations

---

# Core Features

## Authentication & Users

Features:

* User Registration
* User Login
* JWT Authentication
* Customer Accounts
* Staff Accounts
* Super Admin Accounts

Roles:

* CUSTOMER
* STAFF
* SUPER_ADMIN

---

## Role Based Access Control (RBAC)

Supported Permissions:

* MANAGE_PRICING
* MANAGE_STAFF
* VIEW_USERS
* VIEW_TRANSACTIONS
* VIEW_SUPPORT
* VIEW_VERIFICATIONS
* MANAGE_API_KEYS
* REFUND_WALLET

Features:

* Permission Assignment
* Staff Access Control
* Protected Endpoints
* Multi-Level Administration

---

# Wallet System

Every customer receives a wallet.

Features:

* Wallet Creation
* Wallet Balance Tracking
* Wallet Credits
* Wallet Debits
* Transaction History
* Revenue Analytics
* Verification Cost Deduction

Verification charges are automatically deducted from wallet balance.

---

# API Key System

Every customer can create and manage API keys.

Features:

* Generate API Keys
* Regenerate API Keys
* Disable Old API Keys
* Multiple API Keys
* API Key Validation
* Active / Inactive Status
* API Usage Tracking
* Verification Usage Logs

Endpoints:

POST /api-keys/:userId

GET /api-keys/:userId

POST /api-keys/regenerate/:apiKeyId

GET /api-keys/usage/:apiKeyId

---

# Developer Portal

Provides API documentation directly from backend.

Endpoint:

GET /pricing/developer/docs

Returns:

* Service Name
* Endpoint
* Current Price

Useful for:

* SDK Builders
* API Consumers
* Integration Partners

---

# Verification Services

Integrated with Nerotix APIs.

Currently Supported Services:

## Identity Verification

✓ Aadhaar OTP

✓ DigiLocker Aadhaar

✓ PAN Verification

✓ PAN 360

✓ Driving License

✓ Passport

✓ Voter ID

---

## Business Verification

✓ GSTIN Verification

✓ PAN To GSTIN

✓ CIN / MCA Lookup

✓ Udyam Verification

✓ PAN To Udyam

---

## Banking Verification

✓ Penny Drop

---

## Face Intelligence

✓ Face Check

✓ Face Liveliness Check

✓ Name Match

---

## Location Intelligence

✓ Reverse Geocoding

---

## Vehicle Intelligence

✓ Vehicle RC

---

## Employment Verification

✓ Employment 360

---

## Telecom Intelligence

✓ Number Lookup

---

# Verification Flow

Every verification follows the same workflow:

1. Validate API Key
2. Verify Wallet Balance
3. Fetch Pricing
4. Deduct Wallet Balance
5. Call Nerotix API
6. Store Response
7. Create Verification Record
8. Create Transaction Record
9. Return API Response

---

# Verification History

Every verification request is stored.

Stored Data:

* User ID
* Service Name
* Request Payload
* Response Payload
* Amount Charged
* Status
* Error Messages
* Timestamp

Endpoint:

GET /verifications/history/:userId

---

# Pricing Management

Every service has configurable pricing.

Features:

* Dynamic Pricing
* Public Pricing Endpoint
* Admin Pricing Controls
* Active/Inactive Pricing

Endpoints:

GET /pricing

PATCH /pricing/:id

Supported Services:

* AADHAAR_OTP
* DIGILOCKER
* PAN_VERIFY
* PAN_360
* DRIVING_LICENSE
* PASSPORT
* VOTER_ID
* GST_VERIFY
* PAN_TO_GSTIN
* CIN_LOOKUP
* UDYAM
* PAN_TO_UDYAM
* PENNY_DROP
* FACE_CHECK
* FACE_LIVELINESS
* NAME_MATCH
* REVERSE_GEOCODING
* VEHICLE_RC
* EMPLOYMENT_360
* NUMBER_LOOKUP

---

# Staff Management

Features:

* Create Staff Members
* Assign Permissions
* List Staff Members
* View Staff Permissions
* Revoke Permissions

---

# Support Ticket System

Features:

* Create Ticket
* View User Tickets
* View All Tickets
* Update Ticket Status

Statuses:

* OPEN
* IN_PROGRESS
* RESOLVED

---

# Admin Dashboard

Provides platform-wide analytics.

Metrics:

* Total Users
* Total Staff
* Total Transactions
* Active API Keys
* Wallet Revenue
* Verification Revenue
* Verification Statistics
* User Growth

---

# Webhooks

Features:

* Create Webhooks
* Enable Webhooks
* Disable Webhooks
* Delete Webhooks
* Retrieve User Webhooks

---

# Razorpay Integration

Supported Features:

* Create Orders
* Wallet Topups
* Payment Verification

Environment Variables:

RAZORPAY_KEY_ID

RAZORPAY_KEY_SECRET

RAZORPAY_WEBHOOK_SECRET

---

# Health Monitoring

Endpoint:

GET /health

Response:

{
"status": "ok",
"service": "saas-backend"
}

---

# Technology Stack

Backend:

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

Verification Provider:

* Nerotix API

Security:

* Helmet
* ValidationPipe
* Permission Guards

---

# Project Structure

saas-project

├── backend

│ ├── prisma

│ ├── src

│ │ ├── admin

│ │ ├── api-keys

│ │ ├── auth

│ │ ├── dashboard

│ │ ├── permissions

│ │ ├── pricing

│ │ ├── razorpay

│ │ ├── staff

│ │ ├── support

│ │ ├── transactions

│ │ ├── users

│ │ ├── verifications

│ │ ├── wallet

│ │ ├── webhooks

│ │ └── health

│ ├── Dockerfile

│ └── package.json

│

├── docker-compose.yml

├── README.md

├── .env.example

└── .gitignore

---

# Prerequisites

Install:

* Node.js 20+
* PostgreSQL 16+
* Git
* Docker Desktop (Optional)

---

# Quick Start

Clone Repository:

git clone <repository-url>

cd saas-project

cd backend

Install Dependencies:

npm install

Create Environment File:

cp ../.env.example .env

Update .env values.

---

# Environment Variables

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/saasdb"

JWT_SECRET=your_secret

PORT=3000

NEROTIX_BASE_URL=https://api.nerofy.in/api/v1

NEROTIX_TOKEN=your_nerotix_token

RAZORPAY_KEY_ID=your_key

RAZORPAY_KEY_SECRET=your_secret

RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

---

# Database Setup

Generate Prisma Client:

npx prisma generate

Apply Database Schema:

npx prisma db push

Open Prisma Studio:

npx prisma studio

---

# Running Locally

Development:

npm run start:dev

Production Build:

npm run build

Run Production:

npm run start:prod

---

# Docker

Start:

docker compose up --build

Stop:

docker compose down

---

# Security

Verification Endpoints require:

x-api-key: YOUR_API_KEY

Permission Protected Endpoints require:

user-id: STAFF_OR_ADMIN_ID

JWT Authentication required for protected routes.

---

# Development Workflow

1. Configure PostgreSQL
2. Configure Environment Variables
3. Generate Prisma Client
4. Push Database Schema
5. Start Backend
6. Register User
7. Generate API Key
8. Fund Wallet
9. Configure Pricing
10. Start Using Verification APIs

---

# Current Platform Status

Completed:

✓ Authentication

✓ RBAC

✓ Wallet System

✓ Transactions

✓ Pricing Management

✓ API Keys

✓ API Key Regeneration

✓ API Usage Analytics

✓ Developer Documentation

✓ Verification History

✓ Support Tickets

✓ Staff Management

✓ Admin Dashboard

✓ Webhooks

✓ Razorpay Orders

✓ 20 Verification Services

✓ Nerotix Integration

Production Ready Core Backend
