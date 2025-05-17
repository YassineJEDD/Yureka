import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import dotenv from 'dotenv';
import { stories } from './src/data/stories.js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

async function migrateImages() {
    for (const story of stories) {
        try {
            const imagePath = path.join(process.cwd(), story.image);

            if (fs.existsSync(imagePath)) {
                console.log(`📤 Migration de l'image: ${story.title}`);

                const result = await cloudinary.uploader.upload(imagePath, {
                    folder: 'story_gifs',
                    public_id: `story_${story.id}`,
                    resource_type: 'auto'
                });

                await axios.put(`http://localhost/books/${story.id}`, {
                    image_url: result.secure_url
                });

                console.log(`✅ Upload réussi: ${result.secure_url}`);
            } else {
                console.error(`❌ Image introuvable: ${imagePath}`);
            }
        } catch (error) {
            console.error(`⚠️ Erreur sur ${story.title}:`, error.message);
        }
    }
}

migrateImages().then(() => console.log('🏁 Migration terminée.'));
