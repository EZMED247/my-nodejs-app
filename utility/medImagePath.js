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
        const baseUrl = 'http://10.0.2.2:3000'; // Base URL for emulator setup
        return `${baseUrl}/${folderPath}/${imageName}`; // Return full URL
    } catch (error) {
        console.error('Error processing file:', error);
        throw new Error('File processing error');
    }
};

module.exports = {
    generateImagePath
};
