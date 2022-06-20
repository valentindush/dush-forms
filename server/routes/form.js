const { CreateForm, getRecentForms, getForm } = require('../controllers/formController');

const router = require('express').Router();

router.post('/create', CreateForm)
router.post('/getrecentforms', getRecentForms)
router.post('/getform', getForm)

module.exports.formRouter = router;