# Lab 13 – Series Management System

This project is a full-stack application designed to manage TV series using **Django REST Framework** for the backend and **React** for the frontend. It allows users to browse, add, edit, delete, and favorite series, along with managing their associated categories.

## 📁 Project Structure

```

lab_13/
├── backend/    # Django REST API
└── frontend/   # React SPA with Axios and React Router

```

---

## ⚙️ Backend Setup (Django)

1. **Clone the repository**
    ```bash
    git clone https://github.com/Vania-0731/lab_13.git
    cd lab_13
    ```

2. **Navigate to the backend folder**

    ```bash
    cd backend
    ```

3. **Create and activate a virtual environment**

   ```bash
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```

4. **Install project dependencies**

   ```bash
   pip install -r requirements.txt
   ```

5. **Run database migrations**

   ```bash
   python manage.py migrate
   ```

6. **Seed initial data**

   ```bash
   python manage.py seed
   ```

7. **Start the development server**

   ```bash
   python manage.py runserver
   ```

> The backend will be available at: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

## 💻 Frontend Setup (React)

1. **Navigate to the frontend folder**

   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

> The frontend will be available at: [http://localhost:5173/](http://localhost:5173/) or a nearby port (e.g. :5174)

## 🧪 Technologies Used

### Backend:

* Django 5.2.2
* Django REST Framework
* django-cors-headers

### Frontend:

* React
* Axios
* React Router DOM
* React Toastify
* Vite
