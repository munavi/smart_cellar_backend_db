const Router = require('express')
const router = new Router()
const storageLocationController = require('../controllers/storageLocationController')

router.post('/',storageLocationController.createStorageLocation)
router.get('/',storageLocationController.getAllStorageLocations)
router.delete('/:id',storageLocationController.removeStorageLocation)

module.exports = router
