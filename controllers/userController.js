const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')

const generateJwt = (id, email, res) => {
    return jwt.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'},
        (err, token) =>{
            res.json({token})
        }
    )
}

class UserController {
    async registration(req, res, next){
        const {email, password } = req.body
        const id = uuid.v4()

        if (!email || !password) {
            return next(ApiError.badRequest('Incorrect email or password'))
        }
        const candidate = await User.findOne({where:{email}})
        if (candidate) {
            return next(ApiError.badRequest('User with this email already exists'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword})
        return generateJwt(id, user.email, res)
    }

    async login(req, res){

    }

    async check(req, res, next){
        const {id} = req.query // Params of request
        if(!id){
            return next(ApiError.badRequest('There ist no ID'))
        }
        res.json(id)
    }
}

module.exports = new UserController()