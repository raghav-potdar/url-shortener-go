# URL Shortener

A URL shortening service built with Go and React. Referenced from [this article](https://www.eddywm.com/lets-build-a-url-shortener-in-go/).

## Prerequisites

- Go 1.16+
- Node.js 18+
- Redis server

## Installation

**Install Redis:**
```bash
# Ubuntu/Debian
sudo apt-get install redis-server

# macOS
brew install redis

# Start Redis
redis-server
```

**Install dependencies:**
```bash
# Backend
go mod download

# Frontend
cd frontend
npm install
```

## Running

**Terminal 1 - Backend:**
```bash
go run main.go
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173`

## API Endpoints

- `POST /create-short-url` - Create shortened URL
- `GET /:shortUrl` - Redirect to original URL

## Tech Stack

- Backend: Go, Gin, Redis
- Frontend: React, Vite
