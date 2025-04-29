import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../../Yureka/src/views/App.jsx'
import Home from '../../Yureka/src/views/pages/Home'
import Library from '../../Yureka/src/views/pages/Library'
import Reader from '../../Yureka/src/views/pages/Reader'
import './styles/index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'library', element: <Library /> },
            { path: 'read/:storyId', element: <Reader /> }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)