const Router = require('express');
const router = Router.Router();
const userRouter = require('./usersRouter');
const institutionRouter = require('./institutionRouter');
const mapRouter = require('./mapRouter');

router.get('/', (req, res)=> {
    res.redirect('/api/map_page/map');
});
router.use('/user', userRouter);
router.use('/institution', institutionRouter);
router.use('/map_page', mapRouter);

module.exports = router;