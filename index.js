require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const errorHandler = require('./middleware/ErrorHandling')
const router = require('./routes/index');
const dataInit = require('./scheme/DataInit')

const PORT = process.env.PORT || 5000

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        if (process.env.INIT_DATA) {
            dataInit()
        }
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log(e)
    }
}

start()