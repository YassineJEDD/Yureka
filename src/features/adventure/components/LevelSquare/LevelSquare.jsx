import { Link } from 'react-router-dom';
import './LevelSquare.css';

export default function LevelSquare({ level, chapterId, isLevel10 = false, themeColor }) {
    const levelNumber = level.order_index || level.id;

    const color = themeColor || "#396200";

    return (
        <Link
            to={`/adventure/chapter/${chapterId}/level/${level.id}`}
            className={`level-square ${isLevel10 ? 'level-10' : ''}`}
            style={{
                borderColor: color,
                "--hover-bg-color": `${color}40`,
                "--hover-border-color": color
            }}
        >
            <span className="level-number" style={{ color }}>{levelNumber}</span>
        </Link>
    );
}