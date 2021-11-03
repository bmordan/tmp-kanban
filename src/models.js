const {Sequelize, Model, DataTypes} = require('sequelize')
const path = require('path')

const connectionSettings = {
    test: {dialect: 'sqlite', storage: 'sqlite::memory:'},
    dev: {dialect: 'sqlite', storage: path.join(__dirname, 'data.db')},
    production: {dialect: 'postgres', protocol: 'postgres'}
}

const sequelize = process.env.NODE_ENV === 'production'
    ? new Sequelize(process.env.DATABASE_URL, connectionSettings[process.env.NODE_ENV])
    : new Sequelize(connectionSettings[process.env.NODE_ENV])

class User extends Model {}
User.init({
    name: DataTypes.STRING,
    avatar: DataTypes.STRING
}, {sequelize})
class Board extends Model {}
Board.init({
    title: DataTypes.STRING
}, {sequelize})
class Task extends Model {}
Task.init({
    desc: DataTypes.STRING,
    status: DataTypes.NUMBER
}, {sequelize})
Board.hasMany(Task, {as: 'tasks'})
Task.belongsTo(Board)
User.hasMany(Task)
Task.belongsTo(User, {as: 'user'})

module.exports = {
    Board,
    User,
    Task,
    sequelize
}