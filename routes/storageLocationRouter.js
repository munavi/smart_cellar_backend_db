const Router = require('express')
const router = new Router()
const storageLocationController = require('../controllers/storageLocationController')

router.post('/',storageLocationController.create)
router.get('/',storageLocationController.getAll)
router.delete('/:id',storageLocationController.removeOne)

module.exports = router