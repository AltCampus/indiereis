const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const jwtAuth = require("../config/jwtAuth");

// // cloudinary image uploading code block on
// const multer = require("multer");
// const cloudinary = require("cloudinary");

// const cloudinaryConfig = () =>
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

// const loader = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.match(/jpg|jpej|png|gif&i/)) {
//       cb(new Error("file is not supported"), false);
//     }
//     cb(null, true);
//   },
// });

// router.post("/upload", loader.single("photo"), userController.upload);

// ===================================

router.get("/", userController.allUsers);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.get("/profiles/:id", userController.userProfile);
router.post("/update", jwtAuth.verifyToken, userController.updateUser);
router.post("/delete", userController.deleteUser);
router.post("/verify", userController.verifyToken);
router.get("/verify/:token", userController.verifyUser);
router.post("/forgot-password", userController.forgotPassword);

// router.get('/forgot', userController.forgotPassword);

router.get("/forgot-password", userController.forgotPassword);

router.post("/change-password", userController.changePassword);
router.post("/confirm-otp", userController.confirmOTP);

module.exports = router;
