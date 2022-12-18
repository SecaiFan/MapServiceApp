const Router = require('express');
const router = Router.Router();
const serviceController = require('../controllers/serviceController');

router.get('/add', serviceController.showServiceAddPanel)
router.post('/add', serviceController.addNewservice)
router.get('/change', serviceController.showServiceChangePanel)
router.post('/change', serviceController.changeService)

module.exports = router;