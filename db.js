const {Sequelize} = require('sequelize')
const config = require('config')

const DB_PASSWORD = config.get('db_password')
const DB_NAME = config.get('db_name')
const DB_USER = config.get('db_user')
const DB_HOST = config.get('db_host')
const DB_PORT = config.get('db_port')

module.exports = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        dialect: 'postgres',
        host: DB_HOST,
        port : DB_PORT
    }
)