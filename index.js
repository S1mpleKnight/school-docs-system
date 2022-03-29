const config = require('config')
const express = require('express')
const sequelize = require('./db')
const errorHandler = require('./middleware/ErrorHandling')
const router = require('./routes/index');

const PORT = config.get('port') || 5000

const app = express()

app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

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