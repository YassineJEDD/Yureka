import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StoryCard from '../components/StoryCard'
import { stories } from '../data/stories'

export default function Home() {
    const [recentStories, setRecentStories] = useState([])
    const [otherStories, setOtherStories] = useState([])

    useEffect(() => {
        const recent = stories.filter(story => story.lastRead)
        const others = stories.filter(story => !story.lastRead)

        setRecentStories(recent)
        setOtherStories(others)
    }, [])

    return (
        <div className="home">
            <h1>Continue Reading</h1>
            <div className="story-grid">
                {recentStories.map(story => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>

            <h1>Other Stories</h1>
            <div className="story-grid">
                {otherStories.map(story => (
                    <StoryCard key={story.id} story={story} />
                ))}
            </div>
        </div>
    )
}