import { useState } from 'react'
import { Link } from 'react-router-dom'
import StoryCard from '../components/StoryCard.jsx'
import { stories } from '../../data/stories.js'

export default function Library() {
    const [levelFilter, setLevelFilter] = useState('all')

    const filteredStories = levelFilter === 'all'
        ? stories
        : stories.filter(story => story.level === levelFilter)

    return (
        <div className="library">
            <div className="library-header">
                <h1>Story Library</h1>
                <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>

            <div className="story-grid">
                {filteredStories.map(story => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
        </div>
    )
}