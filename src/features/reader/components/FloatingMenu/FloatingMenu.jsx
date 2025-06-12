import { useRef, useState, useEffect } from 'react';
import './FloatingMenu.css';

const FloatingMenu = ({ showPinyin, setShowPinyin, initialPosition = { x: 0, y: 500 } }) => {
    const [menuPosition, setMenuPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const menuRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            setMenuPosition({
                x: newX,
                y: newY
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset]);

    const handleDragStart = (e) => {
        if (!menuRef.current) return;

        const rect = menuRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setIsDragging(true);
    };

    return (
        <div
            ref={menuRef}
            className={`floating-menu ${isDragging ? 'dragging' : ''}`}
            style={{
                left: `${menuPosition.x}px`,
                top: `${menuPosition.y}px`
            }}
        >
            <div
                className="drag-handle"
                onMouseDown={handleDragStart}
            >
                <div className="drag-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <button
                className={`pinyin-toggle ${showPinyin ? 'active' : ''}`}
                onClick={() => setShowPinyin(!showPinyin)}
            >
                拼音 <br /> Pinyin
            </button>
        </div>
    );
};

export default FloatingMenu;