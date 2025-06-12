import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/layout/Header/Header.jsx'
import Footer from './components/layout/Footer/Footer.jsx'
import './styles/App.css';
import './components/layout/Header/Header.css';
import './components/layout/Footer/Footer.css';

export default function App() {
    const location = useLocation();
    const isReaderPage = location.pathname.includes('/read/');

    return (
        <div className="app">
            {!isReaderPage && <Header />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}