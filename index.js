const express = require('express')
const config = require('config')
const sequelize = require('./db')

const PORT = config.get('port') || 5000

const app = express()

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log(e)
    }
}

start()