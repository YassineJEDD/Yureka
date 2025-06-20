# Yureka! 🐉 - Chinese Learning Adventure

An interactive web application for learning Chinese through engaging stories, adventures, and gamified quizzes.

![Yureka Logo](./src/assets/Yureka-Assets/yureka-m-logo.png)

## 📚 Features

- **Story Library**: Read Chinese stories with interactive character definitions and pinyin support
- **Adventure Mode**: Progress through chapters and levels with quiz-based learning
- **Multi-level Content**: Stories categorized by difficulty (Newbie, Explorer, Sage, Grand Master)
- **User Profiles**: Track your reading progress and achievements
- **Interactive Reader**: Click on sentences for translations, hover over words for definitions
- **Dictionary**: English to Chinese translation tool
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/yureka.git
   cd yureka
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   # Cloudflare R2 Storage Configuration
   CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
   R2_ENDPOINT=your_r2_endpoint
   R2_ACCESS_KEY_ID=your_r2_access_key
   R2_SECRET_ACCESS_KEY=your_r2_secret_key
   R2_BUCKET_NAME=your_bucket_name
   R2_PUBLIC_URL=your_public_url
   ```

   ⚠️ **Important**: Never commit your `.env` file to version control!

4. **Backend Setup**

   This application requires a backend API running on `http://localhost`. Make sure your backend server is:
    - Running on the default port (usually 80 or configured in your backend)
    - Has all necessary endpoints configured (see API Endpoints section)
    - Database is properly set up and seeded with initial data

### Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Open your browser**

   Navigate to `http://localhost:5173` (Vite's default port)

3. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

## 🏗️ Project Structure

```
yureka/
├── src/
│   ├── assets/          # Images, fonts, and static assets
│   ├── components/      # Reusable UI components
│   │   ├── auth/       # Authentication components
│   │   ├── layout/     # Header, Footer components
│   │   └── ui/         # Common UI elements
│   ├── contexts/       # React Context providers
│   ├── features/       # Feature-specific modules
│   │   ├── adventure/  # Adventure mode components
│   │   ├── auth/       # Login/Register pages
│   │   ├── community/  # Community features
│   │   ├── dictionary/ # Dictionary feature
│   │   ├── discover/   # Browse stories page
│   │   ├── home/       # Homepage components
│   │   ├── profile/    # User profile page
│   │   └── reader/     # Story reader components
│   ├── services/       # API service functions
│   └── styles/         # Global CSS files
├── public/             # Public assets
├── .env               # Environment variables (create this)
├── .gitignore         # Git ignore file
├── package.json       # Project dependencies
└── vite.config.js     # Vite configuration
```

## 🔌 API Endpoints

The application expects the following backend API endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Books/Stories
- `GET /books` - Fetch all books
- `GET /books/:id` - Fetch specific book with content

### User Data
- `GET /users/:userId` - Get user information
- `GET /users/:userId/books` - Get user's book reading status
- `POST /users/:userId/books/:bookId/read` - Mark book as read
- `DELETE /users/:userId/books/:bookId/read` - Mark book as unread

### Adventure Mode
- `GET /chapters` - Fetch all chapters
- `GET /chapters/:id` - Fetch specific chapter
- `GET /levels?chapter_id=:id` - Fetch levels for a chapter
- `GET /levels/:id` - Fetch specific level
- `GET /levels/:id/questions` - Fetch questions for a level

## 🛠️ Technologies Used

- **Frontend Framework**: React 19.0.0
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: CSS3 with custom pixel-art theme
- **State Management**: React Context API
- **HTTP Client**: Native Fetch API
- **Cloud Storage**: Cloudflare R2 (for images)

## 🎮 Usage Guide

### For New Users
1. Click "Register" to create an account
2. Browse stories in the homepage or "Discover" section
3. Start with "Newbie" level stories
4. Try "Adventure" mode for structured learning

### Reading Stories
1. Click on any story card to open the reader
2. Click sentences to see English translations
3. Hover over Chinese characters for word definitions
4. Toggle pinyin display with the floating menu
5. Mark stories as read to track progress

### Adventure Mode
1. Navigate to Adventure from the main menu
2. Select a chapter based on your level
3. Complete 10 levels per chapter
4. Answer quiz questions to progress

## 🐛 Troubleshooting

### Common Issues

1. **Backend connection errors**
    - Ensure your backend server is running on `http://localhost`
    - Check if all required API endpoints are implemented
    - Verify CORS is properly configured on the backend

2. **Images not loading**
    - Check if Cloudflare R2 credentials are correctly set in `.env`
    - Ensure image URLs in the database point to valid R2 objects

3. **Authentication issues**
    - Clear browser localStorage
    - Check if JWT tokens are properly handled by backend
    - Verify user data structure matches frontend expectations

4. **Build errors**
    - Delete `node_modules` and `package-lock.json`
    - Run `npm install` again
    - Ensure Node.js version is 16.0.0 or higher

## 📝 Development

### Linting
```bash
npm run lint
```

## 📄 License

This project is proprietary software. All rights reserved by Ycorporation.

---

**Happy Learning! 加油! 🎯**