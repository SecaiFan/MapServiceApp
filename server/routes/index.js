const Router = require('express');
const router = Router.Router();
const userRouter = require('./usersRouter');
const serviceRouter = require('./serviceRouter');
const mapRouter = require('./mapRouter');

router.get('/', (req, res)=> {
    res.redirect('/api/map');
});
router.use('/user', userRouter);
router.use('/service', serviceRouter);
router.use('/map_page', mapRouter);

module.exports = router;