const Router = require('express')
const router = new Router()
const currencyController = require('../controllers/currencyController')

router.post('/',currencyController.create)
router.get('/',currencyController.getAll)
router.delete('/:id',currencyController.removeOne)

module.exports = router