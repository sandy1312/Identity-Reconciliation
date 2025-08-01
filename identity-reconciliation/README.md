# 🧠 Bitespeed Backend Task – Identity Reconciliation

## 🔍 Overview

This service solves the problem of identity reconciliation for Bitespeed’s customer data. It links multiple contact entries (email/phoneNumber) from different transactions into a single consolidated user identity, even when customers use varying contact information.

## ⚙️ Tech Stack

- **Backend**: Node.js, Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL (or any SQL database)
- **Hosting**: [Render.com](https://render.com)

---

## 🚀 API Endpoint

### `POST /identify`

##  🚀 Live Endpoint

> Base URL:  
`https://identity-reconciliation-rvft.onrender.com`

### ✅ Request Body

json
{
  "email": "example@fluxkart.com",
  "phoneNumber": "1234567890"
}

### CURL Request to Check on Postman
curl -X POST https://identity-reconciliation-rvft.onrender.com/identify \ 
-H "Content-Type: application/json" \
-d '{"email":"marty@flux.com","phoneNumber":"123456"}'


