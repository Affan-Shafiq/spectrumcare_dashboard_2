# SpectrumDash Admin Backend

Backend server for the SpectrumDash Admin Dashboard built with Node.js, Express, and Firebase Admin SDK.

## Setup Instructions

### 1. Install Dependencies

If you encounter PowerShell execution policy errors, run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then install nodemon:
```bash
npm install --save-dev nodemon
```

### 2. Environment Variables

The `.env` file has been created with the following configuration:
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)
- `FIREBASE_SERVICE_ACCOUNT_PATH`: Path to Firebase service account key
- `FRONTEND_URL`: Frontend URL for CORS (default: http://localhost:5173)

### 3. Firebase Service Account Key

Ensure `serviceAccountKey.json` is placed in the `backend` folder.

### 4. Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 5. Testing the Server

Once running, test the health endpoint:
```
GET http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "SpectrumDash Admin Backend is running",
  "timestamp": "2025-12-22T00:00:00.000Z"
}
```

## Project Structure

```
backend/
├── config/
│   └── firebase.js          # Firebase Admin SDK configuration
├── controllers/             # Request handlers
├── middleware/              # Custom middleware (auth, etc.)
├── routes/                  # API routes
├── utils/                   # Helper functions
├── .env                     # Environment variables
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies and scripts
└── server.js               # Main server file
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Authentication (Coming Soon)
- `POST /api/auth/login` - Admin login

### Dashboard (Coming Soon)
- Analytics and aggregates endpoints

## Dependencies

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **firebase-admin**: Firebase Admin SDK
- **dotenv**: Environment variable management
- **nodemon** (dev): Auto-reload during development

## Notes

- The server uses CommonJS modules (`type: "commonjs"`)
- CORS is configured to allow requests from the frontend (Vite dev server)
- All sensitive files are excluded via `.gitignore`
