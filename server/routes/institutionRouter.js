const Router = require('express');
const router = Router.Router();
const institutionController = require('../controllers/institutionController');

router.get('/add' /*serviceController.showInstitutionAddPanel*/)
router.post('/add', /*serviceController.addNewInstitution*/)
router.get('/change', /*serviceController.showInstitutionChangePanel*/)
router.post('/change', /*serviceController.changeInstitution*/)

module.exports = router;