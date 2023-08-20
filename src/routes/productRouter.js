const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.post('/',productController.createProduct)
router.get('/count/:userId', productController.getCountProducts)
router.get('/:userId',productController.getProductsByUserId)
router.put('/:id',productController.updateProduct)
router.delete('/:id',productController.removeProduct)

module.exports = router
