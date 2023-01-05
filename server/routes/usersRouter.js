const authMiddleware = require('../middleware/authMiddleware');
const cookieMiddleware = require('../middleware/cookieMiddleware');
const Router = require('express');
const router = Router.Router();
const {body} = require('express-validator');
const userController = require('../controllers/userController');

/*router.get('/registration', authMiddleware, userController.sendCandidatesData);*/
router.post('/registration',
    body('login')
        .escape(),
    body('email')
        .optional({checkNull: true})
        .isEmail()
        .withMessage("Некорректный адрес электронной почты"),
    body('password')
        .trim()
        .isLength({min: 6})
        .withMessage("Пароль должен содержать не менее 6 символов")
        .escape()
        .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "i")
        .withMessage("Пароль должен содержать хотя бы один символ, не являющийся цифрой"),
    userController.registration);
/*router.get('/login', userController.sendUserData);*/
router.post('/login',
    body('login')
        .escape(),
    body('password')
        .escape(),
    userController.login);
/*router.get('/greet',authMiddleware, userController.greetingUser);*/
router.post('/logout', userController.logout);
router.get('/activate', authMiddleware, userController.getActivation);
router.post('/activate', userController.getActivation);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.tokenRefresh);


module.exports = router;