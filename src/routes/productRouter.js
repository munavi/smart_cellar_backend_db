const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')

router.post('/',productController.create)
router.get('/count/get', productController.getCountProducts)
router.get('/:userId',productController.getProductsByUserId)
router.put('/:id',productController.update)
router.delete('/:id',productController.removeOne)

module.exports = router