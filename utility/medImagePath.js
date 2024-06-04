const fs = require('fs')
const getRandomNumber = () => Math.floor(Math.random() * 10000) + 1

const generateImagePath = (req, folderPath) => {
    try {
        const randomNumber = getRandomNumber()
        const originalName = req.file.originalname
        const imageName = `${randomNumber}_${originalName}`
        const imagePath = `${folderPath}/${imageName}`
        fs.renameSync(req.file.path, imagePath)
        return imagePath
    } catch (error) {
        console.error('Error processing file:', error)
        throw new Error('File processing error')
    }
};

module.exports = {
    generateImagePath
};
