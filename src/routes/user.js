const { Router } = require('express');
const router = Router();

const { isLoggedIn, isNotLoggedIn } = require('../libs/auth');
const { renderProfile } = require('../controllers/profile.controller');

router.use(isLoggedIn);

router.get('/profile', renderProfile);

router.use(isNotLoggedIn);

module.exports = router;