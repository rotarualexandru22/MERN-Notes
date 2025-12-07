# 🚀 MERN Notes Application

This project is a clean, responsive, full-stack web application designed for simple note management. It demonstrates proficiency in the **MERN** (MongoDB, Express, React, Node.js) stack, implementing robust **CRUD** (Create, Read, Update, Delete) operations and secure API design principles.

---

## ✨ Key Features

* **CRUD Functionality:** Full capabilities to **C**reate, **R**ead, **U**pdate, and **D**elete notes via a dedicated API.
* **Modern UI/UX:** A sleek, dark-themed, and fully **responsive** user interface built with React and styled using **Tailwind CSS** and **DaisyUI**.
* **Dynamic Routing:** Uses `react-router-dom` to handle navigation between the note list, creation page, and individual note detail/edit pages.
* **API Client:** Utilizes **Axios** for all backend communication, configured for dynamic environment switching (local vs. production API paths).
* **Robust Error Handling:** Implements client-side error handling using `react-hot-toast` for user feedback, including specific logic for API failures and rate limiting.
* **Resource Protection:** Features a robust **Express Rate Limiter** to protect against API abuse and Denial of Service (DoS) attacks on the Express routes.

---

## 🛠️ Technologies Used

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (Vite), `react-router-dom` | Component-based UI and client-side routing. |
| **Styling** | Tailwind CSS, DaisyUI | Rapid, utility-first styling and component library. |
| **State/Side Effects** | Axios, `react-hot-toast` | API communication and transient user notifications. |
| **Backend** | Node.js, Express | Server runtime and API framework. |
| **Database** | MongoDB, Mongoose | NoSQL database and Object Data Modeling (ODM). |
| **Security** | `express-rate-limit`, CORS | API abuse protection and Cross-Origin security. |

---

## ⚙️ Installation and Setup (Monorepo)

To run this project locally, you must set up both the backend and frontend components.

### Prerequisites

* **Node.js (v18+)** & **npm** installed.
* A running **MongoDB** instance (Local or Atlas) for the database.
* Your project has already been cloned and you are in the root directory.

### Steps

#### 1. Install Dependencies

Install packages separately for the backend and frontend folders:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd  frontend
npm install

# Example .env file in backend/
MONGO_URI=mongodb+srv://[username]:[password]@[cluster-url]/[database-name]
PORT=5001

Terminal,Location,Command,Purpose
Window 1,backend/,npm start,Starts the Express API server.
Window 2,frontend/,npm run dev,Starts the React development server via Vite.