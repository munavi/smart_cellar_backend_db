const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    email: {type: DataTypes.STRING, unique: true},
    password : {type: DataTypes.STRING}
})

const Profile = sequelize.define('profile', {
    id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
    firstname: {type: DataTypes.STRING, allowNull: false},
    lastname: {type: DataTypes.STRING, allowNull: false},
})

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}, // should be unique?
    counter : {type: DataTypes.INTEGER, defaultValue: 0},
    date: {type: DataTypes.DATE, allowNull: false},
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const StorageLocation = sequelize.define('storage_location', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Currency = sequelize.define('currency', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Country = sequelize.define('country', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})

User.hasOne(Profile)
Profile.belongsTo(User, { through: User })

Category.hasMany(Product)
Product.belongsTo(Category, { through: Category })

StorageLocation.hasMany(Product);
Product.belongsTo(StorageLocation, { through: StorageLocation });

Country.hasOne(Profile)
Profile.belongsTo(Country, { through: Country })

Currency.hasOne(Profile)
Profile.belongsTo(Currency, { through: Currency })

User.hasMany(Product)
Product.belongsTo(User)


module.exports = {
    User,
    Product,
    Category,
    StorageLocation,
    Profile,
    Currency,
    Country
}