import { Outlet, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import '../styles/App.css';
import '../styles/components/Header.css';
import '../styles/components/Footer.css';

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