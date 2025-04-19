# 🛠️ Projects Manager App

A modern **Laravel 11 + Inertia.js + React** project management app where users can:

-   ✅ Register / Login (with email confirmation)
-   📬 Confirm emails manually via `laravel.log`
-   📁 Create, read, update, and delete **Projects**, **Tasks**, and **Users**
-   📊 View a dashboard summary of task statuses: **pending**, **in progress**, and **completed**

![Screenshot](/public/cover-image.png)

---

## 🚀 Tech Stack

-   **Backend:** Laravel 11, Sanctum, Inertia.js
-   **Frontend:** React 18, Tailwind CSS
-   **UI Libraries:** Headless UI, Heroicons
-   **Build Tool:** Vite
-   **Routing:** Ziggy

---

## 🧪 Features

-   🔐 Auth (Login, Register, Email Confirmation)
-   📝 Full CRUD for:
    -   Projects
    -   Tasks
    -   Users
-   📊 Dashboard with task status summary
-   🧪 Pest for testing
-   🎨 Styled with Tailwind CSS

---

## 📦 Installation

```bash
git clone https://github.com/<your-username>/projects-manager.git
cd projects-manager

# Install backend dependencies
composer install

# Install frontend dependencies
npm install

# Copy env and generate app key
cp .env.example .env
php artisan key:generate

# Run migrations and seed database
php artisan migrate --seed
```

## 🧯 Email Confirmation

This app uses Laravel's default email verification, but emails are not actually sent (for dev purposes).

### To verify a user:

-   Register a new user

-   Open storage/logs/laravel.log

-   Find the verification URL and open it in your browser to confirm the email.

## 💻 Running Locally

If you're using Laravel Herd:

```bash
# Run Vite
npm run dev

# Visit the app
https://projects-manager.test
```

If not using Herd:

```bash

php artisan serve
npm run dev

#Visit: http://127.0.0.1:8000
```
