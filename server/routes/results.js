const { getResults } = require('../controllers/resultsController');
const { getUserInfo } = require('../controllers/userController');

const router = require('express').Router();
router.get('/getresults/:url',getResults)
router.get('/getuserinfo/:id',getUserInfo)
module.exports.resultsRouter = router;