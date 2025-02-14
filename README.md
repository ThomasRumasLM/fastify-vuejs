# Fastify + Vue 3 Full-Stack Application

## 🚀 Overview
This project is a **full-stack web application** that combines **Fastify** as the backend and **Vue 3** as the frontend.

### **🔹 Fastify is used to:**
- 🚀 **Deliver VueJS content** as a static site, served from the Fastify backend.
- 🔐 **Handle OIDC authentication** using OpenID Connect to authenticate users securely.
- 🔄 **Act as a backend API** to proxy requests and manage business logic.

### **🔹 Vue 3 is used to:**
- 📍 **Manage routing with Vue Router** (including protected routes with authentication guards).
- 🏪 **Use Pinia for state management**, including an authentication store.
- 📡 **Send observability events to Fastify via WebSockets** to track page views and navigation.

---

## 🛠️ **Fastify Features**
### **1️⃣ Configuration & Secrets Management**
- The application uses a dedicated Fastify module to manage configuration and secrets.
- Secrets (e.g., OIDC client credentials, database URLs) are **loaded securely** at runtime.

### **2️⃣ VueJS HMR (Hot Module Replacement) with Vite Middleware**
- The Vue 3 application is **integrated with Vite middleware** for **faster development**.
- Any frontend change will **automatically reload** without needing a full server restart.

### **3️⃣ Vue Router Observability with WebSockets**
- A **WebSocket module** allows Vue Router to send **page navigation events** to the backend.
- The backend logs user navigation in real time for **analytics and observability**.

### **4️⃣ OIDC Authentication**
- Fastify manages **authentication with OpenID Connect (OIDC)** using the `openid-client` library.
- Users are redirected to an **OIDC login provider**, and upon success, they return with a token.
- Tokens are stored in **secure HTTP-only cookies**.

### **5️⃣ API Proxying**
- Fastify can **proxy API requests** to other services or a database.
- This is useful when your frontend needs data but should not expose API keys.

---

## 🎨 **Vue 3 Features**
### **1️⃣ Vue Router with Authentication Guards**
- **Protected routes** ensure users must be logged in before accessing certain pages.
- If a user is **not authenticated**, they are redirected to the login page (`/auth/login`).

### **2️⃣ Pinia for State Management**
- **Pinia is used to manage global state** in a simple and scalable way.
- A **dedicated authentication store** keeps track of user login status.
- The authentication store automatically checks the `/auth/user` route to verify authentication status.

### **3️⃣ WebSocket Integration for Observability**
- The Vue app **connects to a WebSocket** to send events when users navigate between pages.
- This allows real-time tracking of page visits and interactions.

---

## 🏗️ **How to Run the Project**

### **1️⃣ Install Dependencies**
```sh
npm install
```

### **2️⃣ Start Fastify Backend**
```sh
npm run dev  # Fastify will start with hot reload enabled
```

By default, the **Vue app is served by Fastify**, so you **don’t need to run it separately**.

---