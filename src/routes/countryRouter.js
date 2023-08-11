const Router = require('express')
const router = new Router()
const countryController = require('../controllers/countryController')

router.post('/',countryController.createCountry)
router.get('/',countryController.getAllCountries)
router.delete('/:id',countryController.removeCountry)

module.exports = router