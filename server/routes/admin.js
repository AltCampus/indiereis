const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/', adminController.login);
router.post('/update', adminController.update);
router.post('/delete', adminController.delete);
// router.post('/logout', adminController.deleteUser);
// router.post('/logout', adminController.deleteUser);
// router.post('/logout', adminController.updateUser);
// router.post('/logout', adminController.deleteUser);

// router.get('/profile/?username', adminController.userProfile);

module.exports = router;
