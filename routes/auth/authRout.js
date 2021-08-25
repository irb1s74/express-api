const router = require('express').Router();
const controller = require('./authCont');
const {check} = require('express-validator');

router.post('/reg', [
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 символов').isLength({min: 4})
], controller.reg)
router.post('/login', controller.login)

module.exports = router;