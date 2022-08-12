const { CreateForm, getRecentForms, getForm, Submitresults } = require('../controllers/formController');

const router = require('express').Router();

router.post('/create', CreateForm)
router.post('/getrecentforms', getRecentForms)
router.post('/getform', getForm)
router.post('/submit',Submitresults)

module.exports.formRouter = router;