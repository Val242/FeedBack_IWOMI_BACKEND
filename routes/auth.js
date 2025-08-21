const express = require('express');
const { adminLogin, registerAdmin, registerFeedBack,registerDeveloper,developerLogin ,upload } = require('../controllers/auth-controller');

const router = express.Router();

router.post('/registeradmin', registerAdmin);
router.post('/registerfeedback', upload.single('screenshot'), registerFeedBack);
router.post('/adminlogin', adminLogin);
router.post('/registerdeveloper', registerDeveloper);
router.post('/collaboratorlogin', developerLogin);

module.exports = router;
