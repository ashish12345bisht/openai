const { getImage, generateStory, getChat } = require('../controllers/openai');

const router = require('express').Router();

router.post('/images', getImage);
router.post('/createStory', generateStory);
router.post('/chat', getChat);

module.exports = router