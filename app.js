const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const studentRoutes = require('./routes/student')
// const categoryRoutes = require('./routes/category')
// const productRoutes = require('./routes/product')
// const braintreeRoutes = require('./routes/braintree')
// const orderRoutes = require('./routes/order')
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
// app.use('/api', categoryRoutes)
// app.use('/api', productRoutes)
// app.use('/api', braintreeRoutes)
// app.use('/api', orderRoutes)
// app.use('/api', bl)


const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})




// .env
// PORT=8000
// DATABASE=mongodb://localhost/ecommerce
// JWT_SECRET=thisisasecretformyapp



