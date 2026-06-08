# DocDesk Backend

Professional Node.js + Express + MongoDB API for the DocDesk patient management system.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and update:

```bash
cp .env.example .env
```

**Required variables:**
- `PORT` — Server port (default: 5000)
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — Secret key for JWT signing (use a strong random string in production)
- `CORS_ORIGIN` — Frontend URL (for CORS)
- `NODE_ENV` — development or production

**Example .env:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/docdesk
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 3. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally, then run
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster → Get connection string
3. Paste in `MONGODB_URI`

### 4. Run Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will be at `http://localhost:5000`

---

## API Documentation

### Authentication

#### Register Doctor
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "doctor@clinic.com",
  "password": "securepassword",
  "name": "Dr. Sarah Jenkins",
  "specialty": "General Practice"
}

Response (201):
{
  "message": "Account created successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "doctor@clinic.com",
    "name": "Dr. Sarah Jenkins",
    "specialty": "General Practice"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "doctor@clinic.com",
  "password": "securepassword"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "doctor@clinic.com",
    "name": "Dr. Sarah Jenkins"
  }
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>

Response (200):
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "doctor@clinic.com",
  "name": "Dr. Sarah Jenkins",
  "specialty": "General Practice",
  "licenseNumber": "MED-88392-CA",
  "clinicName": "Jenkins Family Care",
  "contactNumber": "(555) 123-4567"
}
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Dr. Sarah Jenkins",
  "specialty": "Family Medicine",
  "licenseNumber": "MED-88392-CA",
  "clinicName": "Jenkins Family Care",
  "clinicAddress": "1200 Medical Plaza Drive",
  "contactNumber": "(555) 123-4567"
}

Response (200):
{
  "message": "Profile updated successfully",
  "user": { ... }
}
```

---

### Patients

#### Get All Patients
```http
GET /api/patients?search=jane&page=1&limit=10
Authorization: Bearer <token>

Response (200):
{
  "total": 142,
  "page": 1,
  "limit": 10,
  "pages": 15,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+1 (555) 123-4567",
      "dateOfBirth": "1995-03-15",
      "gender": "Female",
      "bloodType": "A+",
      "allergies": ["Sulfa drugs"],
      "lastVisit": "2024-01-12"
    }
  ]
}
```

#### Get Single Patient
```http
GET /api/patients/507f1f77bcf86cd799439012
Authorization: Bearer <token>

Response (200):
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1 (555) 123-4567",
  "dateOfBirth": "1995-03-15T00:00:00.000Z",
  "gender": "Female",
  "bloodType": "A+",
  "allergies": ["Sulfa drugs"],
  "medicalProblems": [
    {
      "name": "Seasonal Allergies",
      "diagnosed": "2015-05-20T00:00:00.000Z",
      "status": "Chronic"
    }
  ],
  "prescriptions": [
    {
      "name": "Cetirizine",
      "dosage": "10mg, once daily",
      "status": "Active",
      "refills": 3,
      "lastFilled": "2024-01-01T00:00:00.000Z"
    }
  ],
  "notes": [
    {
      "title": "Annual Physical",
      "body": "All vitals normal. Updated vaccinations.",
      "createdAt": "2024-01-12T10:30:00.000Z"
    }
  ],
  "lastVisit": "2024-01-12T00:00:00.000Z",
  "nextAppointment": "507f1f77bcf86cd799439013"
}
```

#### Create Patient
```http
POST /api/patients
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 987-6543",
  "dateOfBirth": "1980-06-15",
  "gender": "Male",
  "bloodType": "O+",
  "allergies": ["Penicillin"]
}

Response (201):
{
  "message": "Patient created successfully",
  "patient": { ... }
}
```

#### Update Patient
```http
PUT /api/patients/507f1f77bcf86cd799439012
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "phone": "+1 (555) 123-4568",
  "bloodType": "A+",
  "patientTag": "VIP"
}

Response (200):
{
  "message": "Patient updated successfully",
  "patient": { ... }
}
```

#### Delete Patient
```http
DELETE /api/patients/507f1f77bcf86cd799439012
Authorization: Bearer <token>

Response (200):
{
  "message": "Patient deleted successfully"
}
```

#### Add Patient Note
```http
POST /api/patients/507f1f77bcf86cd799439012/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Follow-up Visit",
  "body": "Patient reports feeling well. Blood pressure stable at 120/80."
}

Response (200):
{
  "message": "Note added successfully",
  "patient": { ... }
}
```

#### Add Prescription
```http
POST /api/patients/507f1f77bcf86cd799439012/prescriptions
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Lisinopril",
  "dosage": "10mg tablet, take 1 daily",
  "status": "Active",
  "refills": 2
}

Response (200):
{
  "message": "Prescription added successfully",
  "patient": { ... }
}
```

---

### Appointments

#### Get All Appointments
```http
GET /api/appointments?status=Scheduled&page=1&limit=10
Authorization: Bearer <token>

Response (200):
{
  "total": 24,
  "page": 1,
  "limit": 10,
  "pages": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "patientId": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Jane Smith",
        "phone": "+1 (555) 123-4567"
      },
      "date": "2024-02-15T00:00:00.000Z",
      "time": "09:00",
      "type": "Consultation",
      "status": "Scheduled",
      "duration": 30,
      "location": "Clinic"
    }
  ]
}
```

#### Get Upcoming Appointments
```http
GET /api/appointments/upcoming
Authorization: Bearer <token>

Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "patientId": { ... },
    "date": "2024-02-15T00:00:00.000Z",
    "time": "09:00",
    "type": "Consultation",
    "status": "Scheduled"
  }
]
```

#### Create Appointment
```http
POST /api/appointments
Authorization: Bearer <token>
Content-Type: application/json

{
  "patientId": "507f1f77bcf86cd799439012",
  "date": "2024-02-15",
  "time": "09:00",
  "type": "Consultation",
  "notes": "Routine checkup",
  "duration": 30,
  "location": "Clinic",
  "isVirtual": false
}

Response (201):
{
  "message": "Appointment created successfully",
  "appointment": { ... }
}
```

#### Update Appointment
```http
PUT /api/appointments/507f1f77bcf86cd799439013
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2024-02-16",
  "time": "10:00",
  "notes": "Rescheduled per patient request"
}

Response (200):
{
  "message": "Appointment updated successfully",
  "appointment": { ... }
}
```

#### Update Appointment Status
```http
PUT /api/appointments/507f1f77bcf86cd799439013/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Completed"
}

Response (200):
{
  "message": "Appointment marked as Completed",
  "appointment": { ... }
}
```

#### Delete Appointment
```http
DELETE /api/appointments/507f1f77bcf86cd799439013
Authorization: Bearer <token>

Response (200):
{
  "message": "Appointment cancelled"
}
```

---

## Folder Structure

```
docdesk-backend/
├── server.js                    ← Main entry point
├── package.json
├── .env.example
├── .gitignore
│
├── config/
│   └── db.js                    ← MongoDB connection
│
├── middleware/
│   ├── auth.js                  ← JWT verification
│   └── errorHandler.js          ← Error handling
│
├── models/
│   ├── User.model.js            ← Doctor model
│   ├── Patient.model.js         ← Patient model
│   └── Appointment.model.js     ← Appointment model
│
├── controllers/
│   ├── auth.controller.js       ← Auth logic
│   ├── patient.controller.js    ← Patient CRUD
│   └── appointment.controller.js ← Appointment CRUD
│
└── routes/
    ├── auth.routes.js           ← Auth endpoints
    ├── patient.routes.js        ← Patient endpoints
    └── appointment.routes.js    ← Appointment endpoints
```

---

## Testing API with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@clinic.com",
    "password": "password123",
    "name": "Dr. Sarah Jenkins"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@clinic.com",
    "password": "password123"
  }'

# Get patients (replace TOKEN with actual token)
curl -X GET "http://localhost:5000/api/patients" \
  -H "Authorization: Bearer TOKEN"
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message here"
}
```

**Common status codes:**
- `200` — OK
- `201` — Created
- `400` — Bad request (validation error)
- `401` — Unauthorized (no/invalid token)
- `404` — Not found
- `500` — Server error

---

## Connect to Frontend

In your React app, update API calls:

```javascript
// src/api/client.js
const API_BASE_URL = 'http://localhost:5000/api';

export async function apiCall(endpoint, options = {}) {
  const token = localStorage.getItem('authToken'); // Get token from frontend
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  return response.json();
}

// Usage
const patients = await apiCall('/patients?page=1&limit=10');
```

---

## Next Steps

1. ✅ Set up MongoDB
2. ✅ Create `.env` file
3. ✅ `npm install`
4. ✅ `npm run dev`
5. Connect frontend to backend API
6. Deploy to production (Render, Railway, Heroku)

---

**Happy coding! 🚀**
