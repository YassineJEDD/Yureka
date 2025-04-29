export class UIController {
    static filterStoriesByLevel(stories, level) {
        if (level === 'all') return stories;
        return stories.filter(story => story.level === level);
    }

    static groupStoriesByLevel(stories) {
        const groups = {};
        stories.forEach(story => {
            if (!groups[story.level]) {
                groups[story.level] = [];
            }
            groups[story.level].push(story);
        });
        return groups;
    }
}