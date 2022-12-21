const {validationResult, cookie} = require('express-validator');
const userService = require('../services/userServise');
const ApiError = require('../errors/apiError');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const fstError = errors.array({ onlyFirstError: true })[0];
                console.log(fstError);
                return res.json({
                    msg: fstError.msg
                });
            }
            const {login, email, password, rep_password, role} = req.body;
            if(!login || !password || !rep_password) {
                return res.status(520).json({message:"Unknown error!"});
            }
            const userData = await userService.registration(login, email, password, rep_password, role);
            res.cookie('refreshToken', userData.refreshJWT);
            return res.json(userData);
        } catch(e) {
            console.log(e);
            res.status(500).json({message:"Registration error!"});
        }
    }
    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                const fstError = errors.array({ onlyFirstError: true })[0];
                console.log(fstError);
                return res.render('login', {
                    error: true,
                    msg: fstError.msg,
                    layout: false,
                });
            }
            const {login, password} = req.body;
            if(!login || !password) {
                return next(ApiError.badRequest("Некорректный login или password!"));
            }
            const user = await User.findOne({where: {login: login}});
            let comparePassword;
            if(user) comparePassword = await bcrypt.compare(password, user.password);
            if (!user || !comparePassword) {
                return res.render('login', {
                    userCheck: true,
                    msg: "Неверный логин или пароль",
                    layout: false,
                });
            }
            const token = generateJWT(user.id, user.login, user.role);
            await User.update({token: token}, {where: {
                    login: user.login
                }});
            return res.status(303).cookie('token', token, {
                maxAge: 12*3600,
                secure: true,
                httpOnly: true
            }).redirect('greet');
        } catch(e) {
            console.log(e);
            res.status(500).json({message:"Login error!"});
        }
    }
    async logout(req, res, next) {
        try {
            const login = req.login;
            await User.update({token: null}, {where: {
                login: login
            }});
            res.clearCookie('token');
            return res.redirect('registration');
        } catch(e) {
            console.log(e);
            res.status(500).json({message:"Logout error!"});
        }
    }
    async sendCandidatesData(req, res) {
        return res.render('registration', {layout: false});
    }
    async sendUserData(req, res) {
        res.render('login', {layout: false});
    }
    async greetingUser(req, res) {
        console.log(req.cookies);
        return res.render('greeting', {
            layout: false,
            user: req.login,
        });
    }
    async activate(req, res, next) {
        try {

        } catch(e) {

        }
    }
    async tokenRefresh(req, res, next) {
        try {
            res.json(['Something', 'Working']);
        }
         catch(e) {
            console.log(e);
        }
    }
}

module.exports = new UserController();