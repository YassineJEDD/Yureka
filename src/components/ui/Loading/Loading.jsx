import React from 'react';
import './Loading.css';

export default function Loading({ message = "Loading...", className = "" }) {
    return (
        <div className={`loading-container ${className}`}>
            <div className="loading-message">{message}</div>
        </div>
    );
}