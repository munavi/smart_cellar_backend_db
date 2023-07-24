const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.post('/',productController.create)
router.get('/:userId',productController.getProductsByUserId)
router.delete('/:id',productController.removeOne)

module.exports = router