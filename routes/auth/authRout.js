const router = require('express').Router();
const controller = require('./authCont');

router.post('/reg', controller.reg)
router.post('/login', controller.login )

module.exports = router;