const Router = require('express')
const router = new Router()
const profileController = require('../controllers/profileController')

router.post('/',profileController.create)
router.get('/',profileController.getAll)
router.get('/:id',profileController.getOne)
router.delete('/:id',profileController.removeOne)

module.exports = router