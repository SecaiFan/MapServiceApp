const Router = require('express');
const router = Router.Router();
const mapController = require('../controllers/mapController');

router.get('/map' /*mapController.showAll*/);
router.post('/comments' /*mapController.addComments*/);

module.exports = router;