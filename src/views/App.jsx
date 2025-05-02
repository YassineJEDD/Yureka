import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import '../styles/App.css';
import '../styles/components/Header.css';
import '../styles/components/Footer.css';
import '../styles/utilities/grid.css';

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