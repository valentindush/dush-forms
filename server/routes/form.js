const { CreateForm, getRecentForms, getForm, Submitresults, deleteForm } = require('../controllers/formController');

const router = require('express').Router();

router.post('/create', CreateForm)
router.post('/getrecentforms', getRecentForms)
router.post('/getform', getForm)
router.post('/submit',Submitresults)
router.post('/delete',deleteForm)

module.exports.formRouter = router;