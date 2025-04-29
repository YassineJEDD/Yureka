import { stories as storiesData } from '../data/stories.js';
import { StoryCollection } from '../models/StoryCollection.js';

export class StoryService {
    constructor() {
        this.storyCollection = new StoryCollection(storiesData);
    }

    getAllStories() {
        return this.storyCollection.stories;
    }

    getStoryById(id) {
        return this.storyCollection.getById(id);
    }

    getStoriesByLevel(level) {
        return this.storyCollection.getByLevel(level);
    }

    getLevels() {
        return this.storyCollection.getUniqueLevels();
    }
}