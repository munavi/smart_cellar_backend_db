const Router = require('express')
const router = new Router()
const profileController = require('../controllers/profileController')

router.post('/',profileController.createProfile)
router.get('/',profileController.getAllProfiles)
router.get('/:id',profileController.getOneProfile)
router.delete('/:id',profileController.removeProfile)
router.put('/:id', profileController.updateProfile)

module.exports = router
