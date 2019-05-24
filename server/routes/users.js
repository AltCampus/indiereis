const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

const cloudinaryConfig = () => cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
	cloudinary: cloudinaryConfig,
	folder: "demo",
	allowedFormats: ["jpg", "png"],
	// transformation: [{ width: 500, height: 500, crop: "limit" }]
});
const parser = multer({ storage: storage });

router.get('/', userController.allUsers);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.get('/profiles/:username', userController.userProfile);
router.get('/verify/:token', userController.verifyUser);

module.exports = router;