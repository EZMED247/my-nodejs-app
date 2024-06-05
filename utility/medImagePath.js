const path = require('path');
const fs = require('fs');
const getRandomNumber = () => Math.floor(Math.random() * 10000) + 1;

const generateImagePath = (req, folderPath) => {
    try {
        const randomNumber = getRandomNumber();
        const originalName = req.file.originalname;
        const imageName = `${randomNumber}_${originalName}`;
        const imagePath = path.join(folderPath, imageName);
        fs.renameSync(req.file.path, imagePath);
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Use BASE_URL from .env or fallback to localhost
        return `${baseUrl}/${folderPath}/${imageName}`; // Return full URL
    } catch (error) {
        console.error('Error processing file:', error);
        throw new Error('File processing error');
    }
};

module.exports = {
    generateImagePath
};
