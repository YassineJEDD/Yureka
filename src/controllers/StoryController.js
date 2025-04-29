import { StoryService } from '../services/StoryService.js';

export class StoryController {
    constructor() {
        this.storyService = new StoryService();
    }

    getAllStories() {
        return this.storyService.getAllStories();
    }

    getStoryById(id) {
        return this.storyService.getStoryById(id);
    }

    getStoriesByLevel(level) {
        return this.storyService.getStoriesByLevel(level);
    }

    getLevels() {
        return this.storyService.getLevels();
    }
}