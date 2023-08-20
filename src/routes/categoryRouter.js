const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryController')

router.post('/',categoryController.createCategory)
router.get('/',categoryController.getAllCategories)
router.delete('/:id',categoryController.removeCategory)

module.exports = router
