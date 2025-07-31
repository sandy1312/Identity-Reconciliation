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

This endpoint identifies and consolidates customer contact details.

### ✅ Request Body

```json
{
  "email": "example@fluxkart.com",
  "phoneNumber": "1234567890"
}
