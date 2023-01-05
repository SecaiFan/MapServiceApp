const Router = require('express');
const router = Router.Router();
const institutionController = require('../controllers/institutionController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/add' /*, authMiddleware, serviceController.showInstitutionAddPanel*/)
router.post('/add', /*, authMiddleware, serviceController.addNewInstitution*/)
router.get('/change', /*, authMiddleware, serviceController.showInstitutionChangePanel*/)
router.post('/change', /*, authMiddleware, serviceController.changeInstitution*/)

module.exports = router;