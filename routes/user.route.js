const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const router = express.Router();
const upload = require('../middlewares/multer.middleware');

router.post('/register',upload.single('profilePicture'),registerUser);
router.post('/login',loginUser);

module.exports = router;