require('dotenv').config()
var moment = require('moment')
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/routes')
const cors = require('cors')
const fileUploader = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUploader({}))
app.use('/api', router)
app.use(errorHandler)


const start = async() => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
        let dateTime = moment().format("YYYY-MM-DD HH:mm:ss")
        console.log(dateTime)
    } catch(e){
        console.log(e)
    }
}

start()