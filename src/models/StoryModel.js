export class Story {
    constructor(id, title, level, content, lastRead = null) {
        this.id = id;
        this.title = title;
        this.level = level;
        this.content = content;
        this.lastRead = lastRead ? new Date(lastRead) : null;
    }

    getFormattedLastRead() {
        return this.lastRead ? this.lastRead.toLocaleDateString() : 'Never read';
    }

    static fromJSON(json) {
        return new Story(
            json.id,
            json.title,
            json.level,
            json.content,
            json.lastRead
        );
    }
}