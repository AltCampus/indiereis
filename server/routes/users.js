const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// cloudinary image uploading code block on 
const multer = require("multer");
const cloudinary = require("cloudinary");

var cloudinaryConfig = () => cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

var loader = multer({
	storage: multer.diskStorage({}),
	fileFilter: (req, file, cb) => {
		if(!file.mimetype.match(/jpg|jpej|png|gif&i/)){
			cb(new Error("file is not supported"), false)
		}
		cb(null, true)
	}
})
// ===================================

router.get('/', userController.allUsers);
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.get('/profiles/:id', userController.userProfile);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.get('/verify/:token', userController.verifyUser);

router.post('/upload', loader.single('photo'), userController.upload);

// router.use('/users/upload', userApi);
// router.use('/users/login', userApi);
// router.use('/users/register', userApi);
// router.use('/users/update', userApi);
// router.use('/users/delete', userApi);
// router.use('/users/profiles/:username', userApi);
// router.use('/users/verify/:token', userApi);

module.exports = router;