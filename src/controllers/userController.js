const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

class UserController {
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw ApiError.badRequest('Incorrect email or password');
            }

            const candidate = await User.findOne({ where: { email } });
            if (candidate) {
                throw ApiError.badRequest('User with this email already exists');
            }

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({ email, password: hashPassword });

            const token = generateJwt(user.id, user.email);
            return res.json({ token });
        } catch (error) {
            return next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw ApiError.internal('User not found');
            }
            const comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                throw ApiError.internal('Incorrect password is specified');
            }
            const token = generateJwt(user.id, user.email);
            return res.json({ token, id: user.id });
        } catch (error) {
            return next(error);
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email);
            return res.json({ token });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new UserController();
