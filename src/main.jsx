import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../../Yureka/src/views/App.jsx'
import Home from '../../Yureka/src/views/pages/Home'
import Reader from '../../Yureka/src/views/pages/Reader'
import Discover from '../../Yureka/src/views/pages/Discover'
import './styles/index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'read/:storyId', element: <Reader /> },
            { path: 'discover', element: <Discover /> }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)