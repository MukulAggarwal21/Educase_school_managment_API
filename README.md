# School Management API

A Node.js REST API for managing school data with proximity-based sorting functionality.

## 🚀 Features

- **Add School**: Add new schools with name, address, and coordinates
- **List Schools**: Retrieve schools sorted by proximity to user location
- **Input Validation**: Comprehensive validation for all inputs
- **Error Handling**: Proper error responses and logging
- **Distance Calculation**: Haversine formula for accurate distance calculation
- **Security**: CORS, Helmet, and input sanitization

## 📋 Requirements

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/school-management-api.git
cd school-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials:

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT=3306
```

### 4. Database Setup

Run the SQL script to create the database and table:

```bash
mysql -u root -p < database_setup.sql
```

Or manually execute the SQL commands:

```sql
CREATE DATABASE school_management;
USE school_management;

CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 5. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

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
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "1.0.0"
}
```

#### 2. Add School
```http
POST /addSchool
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
        "longitude": -89.6501,
        "created_at": "2024-01-01T00:00:00.000Z"
    }
}
```

#### 3. List Schools
```http
GET /listSchools?latitude=39.7817&longitude=-89.6501
```

**Query Parameters:**
- `latitude` (required): User's latitude (-90 to 90)
- `longitude` (required): User's longitude (-180 to 180)

**Response:**
```json
{
    "success": true,
    "message": "Found 5 schools, sorted by proximity",
    "data": [
        {
            "id": 1,
            "name": "Springfield Elementary School",
            "address": "123 Main Street, Springfield, IL 62701",
            "latitude": 39.7817,
            "longitude": -89.6501,
            "distance": 0.0,
            "created_at": "2024-01-01T00:00:00.000Z"
        }
    ],
    "userLocation": {
        "latitude": 39.7817,
        "longitude": -89.6501
    },
    "totalSchools": 5
}
```

## 🧪 Testing

### Using cURL

**Add a school:**
```bash
curl -X POST http://localhost:3000/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test School",
    "address": "123 Test Street, Test City, TC 12345",
    "latitude": 40.7128,
    "longitude": -74.0060
  }'
```

**List schools:**
```bash
curl "http://localhost:3000/listSchools?latitude=40.7128&longitude=-74.0060"
```

### Using Postman

Import the Postman collection from the repository or use the following endpoints:

1. **Add School**
   - Method: POST
   - URL: `http://localhost:3000/addSchool`
   - Body: Raw JSON (see API documentation)

2. **List Schools**
   - Method: GET
   - URL: `http://localhost:3000/listSchools?latitude=40.7128&longitude=-74.0060`

## 🚀 Deployment

### Railway (Recommended)

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and deploy:
```bash
railway login
railway init
railway add --service mysql
railway deploy
```

### Heroku

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create and deploy:
```bash
heroku create your-school-api
heroku addons:create cleardb:ignite
git push heroku main
```

### Environment Variables for Production

Set these variables in your hosting platform:
- `NODE_ENV=production`
- `PORT=3000` (or your preferred port)
- `DATABASE_URL=mysql://username:password@host:port/database_name`

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
├── database_setup.sql      # Database setup script
└── README.md
```

## 🛡️ Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Input Validation**: Express-validator for request validation
- **SQL Injection Prevention**: Prepared statements
- **Environment Variables**: Sensitive data protection

## 📊 Error Handling

The API returns consistent error responses:

```json
{
    "success": false,
    "message": "Error description",
    "errors": [...] // Validation errors if applicable
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Your Name**
- Email: your.email@example.com
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- MySQL team for the robust database
- All contributors and testers

---

For any questions or issues, please open an issue on GitHub or contact the author directly.
