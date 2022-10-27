const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const studentRoutes = require('./routes/student')
const teacherRoutes = require('./routes/teacher')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const app = express()

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
}).then(() => console.log('Database connected'))

app.use(morgan("dev"))
app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb'}))

app.use('/api', studentRoutes)
app.use('/api', teacherRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})




