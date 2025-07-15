# ShopKatha – Shopkeeper Management System

ShopKatha is a professional, user-friendly shopkeeper management system designed to help shopkeepers manage customers, track payments, handle billing, and monitor shop statistics. The system features a modern UI, robust authentication, and data isolation per shopkeeper.

## Features

- **Dashboard**: View shop stats (total customers, pending amount, active leases, monthly sales, katha collected, active loans).
- **Customer Management**: Add, edit, delete, and list customers. Track pending payments and amounts.
- **Authentication**: Secure login/signup for each shopkeeper. Data is isolated per user.
- **Profile & Settings**: Manage shopkeeper profile, including photo upload.
- **Responsive UI**: Modern, mobile-friendly design using React and Material-UI.
- **Demo Mode**: Dashboard and Add Customer accessible without authentication for demo purposes.

## Tech Stack

- **Frontend**: React, Material-UI (MUI)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other**: Axios (API calls), Multer (file uploads), JWT (authentication)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/shopkatha.git
cd shopkatha
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

#### Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopkatha
JWT_SECRET=your_jwt_secret
```

#### Start the Backend Server

```bash
npm start
```

The backend will run on [http://localhost:5000](http://localhost:5000).

---

### 3. Setup the Frontend

Open a new terminal window/tab:

```bash
cd frontend
npm install
```

#### Start the Frontend

```bash
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## Usage

- **Access the App**: Open [http://localhost:3000](http://localhost:3000) in your browser.
- **Demo Mode**: You can view the dashboard and add customers without logging in (for demo/testing).
- **Sign Up/Login**: Create a shopkeeper account to manage your own customers and data.
- **Add Customer**: Use the "Add Customer" button from the navbar, dashboard, or customer list.
- **Customer List**: View, search, filter, and export customer data. Edit or delete customers as needed.
- **Profile & Settings**: Access from the sidebar to update your shopkeeper profile.

---

## Project Structure

```
shopkatha/
  backend/      # Node.js/Express API, MongoDB models, routes
  frontend/     # React app, Material-UI components, pages
```

---

## Environment Variables

**Backend (`backend/.env`):**

- `PORT`: Port for backend server (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT authentication

**Frontend:**

- By default, the frontend expects the backend at `http://localhost:5000`. If you change the backend port, update API URLs in the frontend code.

---

## Screenshots

> _Add screenshots of your Dashboard, Customer List, and Add Customer pages here for a more professional README._

---

## Troubleshooting

- **MongoDB not running?**  
  Make sure MongoDB is installed and running locally (`mongod`).
- **Port conflicts?**  
  Change the `PORT` in `.env` or frontend API URLs as needed.
- **CORS issues?**  
  Ensure the backend has CORS enabled for the frontend origin.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

**Enjoy using ShopKatha!**  
For any issues, please open an issue on GitHub or contact the maintainer.

--- 