import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { stories } from '../../data/stories.js'
import '../../styles/pages/Reader.css'

export default function Reader() {
    const { storyId } = useParams()
    const [activeSentence, setActiveSentence] = useState(null)

    const story = stories.find(s => s.id === parseInt(storyId))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    if (!story) return <div>Story not found</div>

    return (
        <div className="reader-page">
            <header className="simple-header">
                <div className="header-content">
                    <Link to="/" >
                        <img src="/public/Yureka-Assets/yureka-m-logo.png" alt="Logo" className="logo-yureka" />
                    </Link>

                    <div className="story-title-header">
                        {story.title}
                    </div>

                    <div>
                        <Link to="/profile">
                            <img src="/public/Yureka-Assets/profile-icon.png" alt="profile-icon" className="profile-icon" />
                        </Link>
                    </div>
                </div>
            </header>

            <div className="reader">
                <h1>{story.title}</h1>
                <div className="content">
                    {story.content.map((sentence, index) => (
                        <div
                            key={index}
                            className="sentence-reader"
                            onClick={() => setActiveSentence(index)}
                        >
                            <p className="chinese">{sentence.chinese}</p>
                            {activeSentence === index && (
                                <p className="english">{sentence.english}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
