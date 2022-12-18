const Router = require('express');
const router = Router.Router();
const userRouter = require('./userRouter');

router.get('/', (req, res)=> {
    res.redirect('/api/map');
});
router.use('/user', userRouter);
router.use('/service', )

module.exports = router;