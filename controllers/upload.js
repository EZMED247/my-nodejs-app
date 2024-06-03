const upload = require('../models/upload')
const { Storage } = require('megajs')
const fs = require('fs')
const { StatusCodes } = require('http-status-codes')

const fileUpload = async (req, res) => {
    try {
        const storage = new Storage({
            email: process.env.MEGA_EMAIL,
            password: process.env.MEGA_PW
        });

        await storage.ready

        // Get a reference to the folder
        let folder = storage.root.children.find(child => child.name === 'uploads')

        // If the folder doesn't exist, create it
        if (!folder) {
            folder = await storage.root.mkdir('uploads')
        }

        // Upload the file to the folder
        const file = await folder.upload(
            { name: req.file.originalname, size: req.file.size },
            fs.createReadStream(req.file.path)
        ).complete

        console.log('The file was uploaded!')

        const fileUrl = await file.link()
        console.log(fileUrl)

        // Delete the file from the server after it's been uploaded to MEGA
        fs.unlinkSync(req.file.path);

        await upload.create({ ...req.body, imageLink: fileUrl })
        res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'file uploaded successfully and put to the database'
        })
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while uploading the file.')
    }

};

module.exports = fileUpload
