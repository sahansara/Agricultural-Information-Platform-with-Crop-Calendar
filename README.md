# 🌾 Agricultural Information Platform with Crop Calendar

## 📌 Project Overview
The **Agricultural Information Platform with Crop Calendar** is designed to assist farmers and agricultural stakeholders by providing essential crop-related information. 
The platform offers a **crop calendar**, agricultural tips, and insights to help improve productivity and sustainability in farming.

---

## 🛠️ Technologies Used

| **Technology**  | **Usage**  |
|----------------|-----------|
| **Frontend**  | React.js  |
| **Backend**   | Laravel (PHP Framework) |
| **Database**  | MySQL |
| **Authentication** | Laravel Sanctum (Token-Based Authentication) |
| **Hosting**  | GitHub / Deployment on Cloud |

---

## 🎨 User Interfaces
The project consists of multiple user interfaces designed for different user roles. 

👤 **User Interfaces:**
- **👩‍🌾 Farmer Dashboard** – View crop schedules, tips, and reports.
- **📊 Admin Panel** – Manage users, crop information, and calendar.
- **🔍 Search & Filter Page** – Find agricultural data easily.
- **📅 Crop Calendar Page** – Displays seasonal planting and harvesting schedules.
- **👥 User Authentication** – Login and registration system.

---

## 🔌 Software Interfaces 
This system interacts with different software components to ensure smooth data flow and user experience:

- **🔗 API Integration**: Backend (Laravel) provides RESTful APIs for frontend communication.
- **💾 Database Management**: MySQL stores user data, crop schedules, and other relevant information.
- **🔑 Authentication & Authorization**: Laravel Sanctum is used for secure login and access control.
- **📤 Data Export & Import**: Admin can upload/download reports in various formats.

---

## ✅ Functional Requirements 
The system is designed to meet several key functional requirements:

✨ **AI-Powered Features** ✨
- 🤖 **AI Chatbot for Instant Support** – Provides real-time assistance to farmers.
- 🦠 **Intelligent Disease Detection** – Identifies plant diseases from images using AI.


1️⃣ **User Management** – Admin can create, update, and delete users. <br>
2️⃣ **Crop Calendar** – Provides a planting and harvesting schedule based on region and season.<br>
3️⃣ **Agricultural Tips** – Displays farming techniques and climate-based recommendations.<br>
4️⃣ **Search & Filter System** – Users can search crop details, weather data, and farming guidelines.<br>
5️⃣ **Secure Authentication** – Uses Laravel Sanctum for login and access control.<br>
6️⃣ **Data Analytics & Reports** – Farmers and stakeholders can analyze trends in crop production.<br>
7️⃣ **Admin Dashboard** – Manages user accounts, crop entries, and system settings.<br>
8️⃣ **🤖 AI Chatbot for Instant Support** – Provides real-time assistance to farmers.<br>
9️⃣ **🦠 Intelligent Disease Detection** – Identifies plant diseases from images using AI.<br>

---

## 🚀 Getting Started
To run this project locally, follow these all steps:

### 📥 Clone the Repository
```sh
 git clone https://github.com/sahansara/Agricultural-Information-Platform-with-Crop-Calendar.git
 cd Agricultural-Information-Platform-with-Crop-Calendar
```

### 🔧 Install Dependencies
#### 📌 Backend (Laravel)
```sh
 cd backend
 composer install
 cp .env.example .env
 php artisan key:generate
 php artisan migrate --seed
 php artisan serve
```

#### 📌 Frontend (React.js)
```sh
 cd frontend
 npm install
 npm start
```

### 🛠️ Running the Project
- Open `http://localhost:3000` for the frontend.
- Open `http://127.0.0.1:8000/api` for the backend.

---

## 📜 License
This project is open-source under the **MIT License**.

---


