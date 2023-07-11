const ApiError = require('../error/ApiError')

class UserController {
    async registration(req, res){

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