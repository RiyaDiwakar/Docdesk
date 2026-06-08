# ✅ NPM Install Errors - Fixed

## Issue

```
npm error code ETARGET
npm error notarget No matching version found for jsonwebtoken@^9.1.2
```

## ✅ Solution

The backend `package.json` has been updated with correct npm package versions:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "jsonwebtoken": "^9.0.2",        ← Fixed (was 9.1.2)
    "bcryptjs": "^2.4.3",
    "express-validator": "^7.0.0"
  }
}
```

## 🚀 Try Again

Delete node_modules and reinstall:

```bash
# If node_modules exists
rm -rf node_modules package-lock.json

# Then install
npm install
```

Or directly:

```bash
npm cache clean --force
npm install
```

---

## If Still Error

Run with specific Node.js version (12+):

```bash
node --version          # Check your Node version
npm install --legacy-peer-deps
```

---

## ✅ Should Now Work

```bash
npm run dev
# Server starts on http://localhost:5000
```

---

**Latest backend.zip has been re-uploaded with fixes.** Download it again! 📦
