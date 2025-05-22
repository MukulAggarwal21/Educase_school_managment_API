# School Management API

A Node.js REST API for managing school data, including proximity-based sorting, robust validation, and secure best practices.

---

## 🚀 Features

- **Add School:** Register new schools with name, address, and coordinates.
- **List Schools:** Retrieve all schools sorted by proximity to a user’s location.
- **Input Validation:** Comprehensive validation for all inputs.
- **Error Handling:** Consistent error responses and logging.
- **Distance Calculation:** Uses the Haversine formula for accurate distance measurement.
- **Security:** CORS, Helmet, and input sanitization.
- **Production Ready:** Easily deployable to cloud platforms.

---

## 🌐 Live API

**Base URL:**  
[https://educase-school-managment-api-3.onrender.com](https://educase-school-managment-api-3.onrender.com)

---

## 📋 Requirements

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm

---

## 🛠️ Installation

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/school-management-api.git
cd school-management-api
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=defaultdb
DB_PORT=your_mysql_port

# For production (update when deploying)
DATABASE_URL=mysql://user:password@host:port/dbname?ssl-mode=REQUIRED
```

### 4. Database Setup

Connect to your MySQL database and run:

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_coordinates ON schools(latitude, longitude);
```

### 5. Start the Server

```sh
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

---

## 📚 API Documentation

### Base URL

- **Production:** `https://educase-school-managment-api-3.onrender.com`
- **Local:** `http://localhost:3000`

### Endpoints

#### 1. Health Check

```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "School Management API is running",
  "timestamp": "2025-05-23T00:00:00.000Z"
}
```

#### 2. Add School

```http
POST /api/addSchool
```

**Request Body:**
```json
{
  "name": "Springfield Elementary School",
  "address": "123 Main Street, Springfield, IL 62701",
  "latitude": 39.7817,
  "longitude": -89.6501
}
```

**Response:**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Springfield Elementary School",
    "address": "123 Main Street, Springfield, IL 62701",
    "latitude": 39.7817,
    "longitude": -89.6501
  }
}
```

#### 3. List Schools

```http
GET /api/listSchools?latitude=39.7817&longitude=-89.6501
```

**Query Parameters:**
- `latitude` (required): User's latitude (-90 to 90)
- `longitude` (required): User's longitude (-180 to 180)

**Response:**
```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "Springfield Elementary School",
      "address": "123 Main Street, Springfield, IL 62701",
      "latitude": 39.7817,
      "longitude": -89.6501,
      "distance": 0.0,
      "created_at": "2025-05-23T00:00:00.000Z"
    }
  ],
  "userLocation": {
    "latitude": 39.7817,
    "longitude": -89.6501
  }
}
```

---

## 🧪 Testing

### Using Postman

1. **Add School**
   - Method: POST
   - URL: `https://educase-school-managment-api-3.onrender.com/api/addSchool`
   - Body: Raw JSON (see above)

2. **List Schools**
   - Method: GET
   - URL: `https://educase-school-managment-api-3.onrender.com/api/listSchools?latitude=39.7817&longitude=-89.6501`

### Using cURL

```sh
curl -X POST https://educase-school-managment-api-3.onrender.com/api/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test School",
    "address": "123 Test Street, Test City, TC 12345",
    "latitude": 40.7128,
    "longitude": -74.0060
  }'

curl "https://educase-school-managment-api-3.onrender.com/api/listSchools?latitude=40.7128&longitude=-74.0060"
```

---

## 🚀 Deployment

### Render (Production)

- The API is live at: [https://educase-school-managment-api-3.onrender.com](https://educase-school-managment-api-3.onrender.com)
- Set environment variables in the Render dashboard as per your `.env`.

### Other Platforms

- You can deploy to [Railway](https://railway.app/), [Vercel](https://vercel.com/), [Heroku](https://heroku.com/), etc.
- Set environment variables and database connection as described above.

---

## 🔧 Project Structure

```
school-management-api/
├── src/
│   ├── app.js              # Main application file
│   ├── server.js           # Server startup file
│   ├── config/
│   │   └── database.js     # Database configuration
│   ├── controllers/
│   │   └── schoolController.js
│   ├── models/
│   │   └── School.js       # School model
│   ├── routes/
│   │   └── schoolRoutes.js # API routes
│   ├── middleware/
│   │   └── validation.js   # Validation middleware
│   └── utils/
│       └── distance.js     # Distance calculation utility
├── .env.example            # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

---

## 🛡️ Security Features

- **Helmet:** Sets secure HTTP headers.
- **CORS:** Restricts cross-origin requests.
- **Input Validation:** Uses express-validator for all user input.
- **SQL Injection Prevention:** Uses parameterized queries.
- **Environment Variables:** Sensitive data is never hardcoded.

---

## 📊 Error Handling

- Consistent error responses with HTTP status codes.
- Validation errors are clearly reported.
- All errors are logged to the console for debugging.

**Example error response:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Latitude must be a number between -90 and 90",
      "param": "latitude",
      "location": "query"
    }
  ]
}
```

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your branch.
5. Create a Pull Request.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Your Name**  
- Email: mukulaggarwal219@gmail.com
- GitHub: [@MukulAggarwal21](https://github.com/MukulAggarwal21)  
- LinkedIn: https://www.linkedin.com/in/mukul-aggarwal-850368261/

---

## 🙏 Acknowledgments

- Express.js team for the framework.
- MySQL team for the database.
- All contributors and testers.

---

For any questions or issues, please open an issue on GitHub or contact the author directly.
