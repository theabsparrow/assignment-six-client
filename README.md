## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Daly Dish (Meal service)

Welcome to **Daily Dish**, a modern, responsive, and user-friendly Meal service platform built with the MERN Stack. This platform allows users to explore, buy, and manage meal listings effortlessly with an intuitive interface and robust features.

---

## 🔗 Live Demo

👉 [Live Website link](https://mealbx-client.vercel.app/)  
👉 [Server Live Link](https://daily-dish-server-murex.vercel.app)
👉 [Server GitHub Repository](https://github.com/theabsparrow/assignment-six-server.git)

---

## 📌 Project Features

- Add, Edit, View meals with Category, Price, and Rating
- 📄 meals Details with order Functionality
- 👤 User Dashboard to View Bookings
- 🛡️ Admin Panel to Manage, Users, and meals
- 🌙 Dark Mode Support
- 📱 Fully Responsive for All Devices
- 📤 Image Upload
- 📧 Contact Form with EmailJS Integration
- 📌email verification with OTP
- 🛒order meals by planner and check the matching with percentage
- ✨live delivery tracking system
- real time noitification system

---

## 🛠️ Tech Stack

**used technology:**

- TypeScript
- Next.js
- Tailwind CSS
- Next Nevigation
- React Hook Form
- App router
- TanStack Table
- jwt-decoder
- emailJS
- edgestore
- framer-motion
- react swiper slider
- socket io

---

### **Installation**

1. **Clone the Repository:**

**go to your terminal , access your demanded directory and command**

```bash
git clone https://github.com/theabsparrow/assignment-six-client.git
```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**  
    Create a `.env` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_BASE_API=http://localhost:5000/api/v1
   NEXT_PUBLIC_IMGBB_API_URL= imgbb api
   NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY= google recpatcha client key
   NEXT_PUBLIC_RECAPTCHA_SERVER_KEY= google recaptcha server key
   EDGE_STORE_ACCESS_KEY= edge store access key
   EDGE_STORE_SECRET_KEY= edge store secret key
   NEXT_PUBLIC_SERVICE_ID= email js service id
   NEXT_PUBLIC_TEMPLATE_ID= email js template id
   NEXT_PUBLIC_PUBLIC_KEY= email js punlic key
   ```
