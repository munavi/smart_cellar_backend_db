const Router = require('express')
const router = new Router()
const currencyController = require('../controllers/currencyController')

router.post('/',currencyController.createCurrency)
router.get('/',currencyController.getAllCurrencies)
router.delete('/:id',currencyController.removeCurrency)

module.exports = router
