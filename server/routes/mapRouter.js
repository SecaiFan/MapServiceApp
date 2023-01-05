const Router = require('express');
const router = Router.Router();
const mapController = require('../controllers/mapController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/map' /*mapController.showAll*/);
router.post('/comments' /*, authMiddleware,mapController.addComments*/);

module.exports = router;