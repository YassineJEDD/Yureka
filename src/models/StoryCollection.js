import { Story } from './StoryModel.js';

export class StoryCollection {
    constructor(stories = []) {
        this.stories = stories.map(story => Story.fromJSON(story));
    }

    getById(id) {
        return this.stories.find(story => story.id === parseInt(id));
    }

    filterByLevel(level) {
        if (level === 'all') return this.stories;
        return this.stories.filter(story => story.level === level);
    }

    getByLevel(level) {
        return this.filterByLevel(level);
    }

    getUniqueLevels() {
        return [...new Set(this.stories.map(story => story.level))];
    }
}