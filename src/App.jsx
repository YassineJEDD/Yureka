import { Outlet, Link } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './styles/App.css'

export default function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}