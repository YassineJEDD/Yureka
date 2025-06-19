import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './features/home/Home.jsx'
import Reader from './features/reader/Reader.jsx'
import Discover from './features/discover/Discover.jsx'
import Adventure from './features/adventure/Adventure.jsx'
import Levels from './features/adventure/Levels/Levels.jsx'
import Quiz from './features/adventure/Quiz/Quiz.jsx'
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
            { path: 'adventure/chapter/:chapterId/level/:levelId', element: <Quiz /> }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)