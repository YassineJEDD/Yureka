import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { stories } from '../data/stories'

export default function Reader() {
    const { storyId } = useParams()
    const [activeSentence, setActiveSentence] = useState(null)

    const story = stories.find(s => s.id === parseInt(storyId))

    if (!story) return <div>Story not found</div>

    return (
        <div className="reader">
            <h1>{story.title}</h1>
            <div className="content">
                {story.content.map((sentence, index) => (
                    <div
                        key={index}
                        className="sentence"
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
    )
}