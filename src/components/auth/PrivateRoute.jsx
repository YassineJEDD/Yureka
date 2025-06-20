// src/components/auth/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../ui/Loading/Loading';

export default function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <Loading message="Checking authentication..." />;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}