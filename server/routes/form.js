const { CreateForm } = require('../controllers/formController');

const router = require('express').Router();

router.post('/create', CreateForm)

module.exports.formRouter = router;