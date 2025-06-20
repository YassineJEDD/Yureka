// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import App from './App.jsx'
import Home from './features/home/Home.jsx'
import Reader from './features/reader/Reader.jsx'
import Discover from './features/discover/Discover.jsx'
import Adventure from './features/adventure/Adventure.jsx'
import Levels from './features/adventure/Levels/Levels.jsx'
import Quiz from './features/adventure/Quiz/Quiz.jsx'
import Login from './features/auth/Login/Login.jsx'
import Register from './features/auth/Register/Register.jsx'
import Profile from './features/profile/Profile.jsx'
import PrivateRoute from './components/auth/PrivateRoute.jsx'
import './styles/index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'read/:storyId', element: <Reader /> },
            { path: 'discover', element: <Discover /> },
            { path: 'adventure', element: <Adventure /> },
            { path: 'adventure/chapter/:chapterId', element: <Levels /> },
            { path: 'adventure/chapter/:chapterId/level/:levelId', element: <Quiz /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            {
                path: 'profile',
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                )
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
)