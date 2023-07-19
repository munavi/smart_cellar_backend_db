const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const storageLocationRouter = require('./storageLocationRouter')
const categoryRouter = require('./categoryRouter')
const profileRouter = require('./profileRouter')
const countryRouter = require('./countryRouter')
const currencyRouter = require('./currencyRouter')

router.use('/user',userRouter)
router.use('/product', productRouter)
router.use('/storageLocation', storageLocationRouter)
router.use('/category', categoryRouter)
router.use('/profile', profileRouter)
router.use('/country', countryRouter)
router.use('/currency', currencyRouter)

module.exports = router