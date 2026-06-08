# DocDesk - Complete Setup Guide

## 📁 Project Structure

Your complete project should look like this:

```
docdesk-project/                    ← Root folder
│
├── docdesk-frontend/               ← React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── docdesk-backend/                ← Node.js + Express backend
    ├── server.js
    ├── package.json
    ├── .env
    ├── config/
    ├── models/
    ├── controllers/
    ├── routes/
    └── middleware/
```

---

## 🚀 Quick Start (Both Frontend & Backend)

### Step 1: Set Up Backend

```bash
# Navigate to backend
cd docdesk-backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your MongoDB connection
# Edit .env and set MONGODB_URI
```

**What you need in `.env`:**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/docdesk
JWT_SECRET=your-super-secret-key-here
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Start backend:**
```bash
npm run dev
# Server will be at http://localhost:5000
```

---

### Step 2: Set Up Frontend

```bash
# Navigate to frontend
cd docdesk-frontend

# Install dependencies
npm install

# Create .env for frontend
echo "VITE_API_URL=http://localhost:5000/api" > .env.local
```

**Start frontend:**
```bash
npm run dev
# App will be at http://localhost:5173
```

---

## 🔌 Connecting Frontend to Backend

### Option 1: Simple (Recommended for now)

In your frontend's login page, add:

```javascript
// src/pages/LoginPage.jsx

async function handleLogin(email, password) {
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await res.json();
    
    if (!res.ok) throw new Error(data.error);
    
    // Save token
    localStorage.setItem('authToken', data.token);
    
    // Redirect to dashboard
    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
}
```

### Option 2: Professional (Using API client)

1. Copy `API_CLIENT.js` from backend folder
2. Place it in `src/services/apiClient.js` in frontend
3. Use it in your components:

```javascript
// src/pages/LoginPage.jsx
import { authAPI, setAuthToken } from '../services/apiClient';

async function handleLogin(email, password) {
  try {
    const response = await authAPI.login(email, password);
    setAuthToken(response.token);
    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
  }
}
```

Get patients:
```javascript
import { patientAPI } from '../services/apiClient';

const patients = await patientAPI.getAll('', 1, 10);
```

Create appointment:
```javascript
import { appointmentAPI } from '../services/apiClient';

const appointment = await appointmentAPI.create({
  patientId: 'patient-id',
  date: '2024-02-15',
  time: '09:00',
  type: 'Consultation',
});
```

---

## 🗄️ MongoDB Setup

### Option A: MongoDB Atlas (Cloud) - Recommended

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Click "Connect" → "Drivers"
5. Copy connection string
6. Replace in `.env`:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/docdesk?retryWrites=true&w=majority
```

### Option B: Local MongoDB

```bash
# macOS (with Homebrew)
brew install mongodb-community
brew services start mongodb-community

# MongoDB will run on localhost:27017
# Set in .env:
MONGODB_URI=mongodb://localhost:27017/docdesk
```

**Verify connection:**
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok","timestamp":"..."}
```

---

## 🧪 Test the API

### Using cURL

```bash
# Register a doctor
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@clinic.com",
    "password": "securepass123",
    "name": "Dr. Sarah Jenkins",
    "specialty": "General Practice"
  }'

# Save the token from response, then:

# Get patients
curl -X GET "http://localhost:5000/api/patients" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Download Postman: https://www.postman.com/downloads/
2. Create new request
3. `POST` → `http://localhost:5000/api/auth/register`
4. Body → JSON → Paste example from README.md
5. Send!

---

## 📝 Running Both Servers Simultaneously

**Terminal 1 (Backend):**
```bash
cd docdesk-backend
npm run dev
# Starts on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd docdesk-frontend
npm run dev
# Starts on http://localhost:5173
```

Both will now run together. Open frontend in browser:
```
http://localhost:5173
```

---

## 🚢 Deployment

### Deploy Backend (Node.js)

**Option A: Render.com (Free tier available)**
1. Go to https://render.com
2. New → Web Service
3. Connect GitHub repo
4. Environment variables: Add from `.env`
5. Deploy

**Option B: Railway.app**
1. Go to https://railway.app
2. New Project → GitHub
3. Add environment variables
4. Deploy

### Deploy Frontend (React)

**Already familiar with this since MindSync:**
```bash
cd docdesk-frontend
npm run build
# Deploy dist/ to Vercel
```

---

## 🔐 Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production` in production
- [ ] Use MongoDB Atlas for production (not local)
- [ ] Enable HTTPS (all hosting platforms do this)
- [ ] Add rate limiting (for production)
- [ ] Never commit `.env` file
- [ ] Use environment-specific CORS origins

---

## 📚 Frontend Integration Checklist

- [ ] Update `LoginPage.jsx` to call `/api/auth/login`
- [ ] Store JWT token in `localStorage`
- [ ] Pass token in `Authorization` header for all requests
- [ ] Add API client utility (`apiClient.js`)
- [ ] Update `DashboardPage` to fetch from `/api/patients`
- [ ] Update `PatientsPage` to fetch from `/api/patients`
- [ ] Update `AddPatientPage` to POST to `/api/patients`
- [ ] Update `AppointmentsPage` to fetch from `/api/appointments`
- [ ] Handle loading states & errors

---

## 🐛 Debugging

### Backend not connecting to MongoDB?
```bash
# Check connection string in .env
# Test with:
mongosh "mongodb+srv://..."
```

### CORS error in frontend?
```
# Make sure CORS_ORIGIN in .env matches your frontend URL
CORS_ORIGIN=http://localhost:5173
```

### Token invalid?
```javascript
// Check token exists in localStorage
console.log(localStorage.getItem('authToken'));

// Check it's being sent:
// Open DevTools → Network → Any request → Headers
```

### Need to reset MongoDB?
```bash
# Delete all data (development only!)
# In MongoDB Atlas: Browse Collections → Drop Database
```

---

## 📞 Next Steps

1. ✅ Both servers running
2. ✅ MongoDB connected
3. ✅ Test API with cURL/Postman
4. ✅ Integrate LoginPage with `/api/auth/login`
5. ✅ Integrate PatientsPage with `/api/patients`
6. ✅ Integrate AppointmentsPage with `/api/appointments`
7. ✅ Add error handling & loading states
8. ✅ Deploy to production

---

**You're ready to go! 🎉**

Questions? Check the README.md in both frontend and backend folders.
