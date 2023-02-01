const express = require('express')
const app = express();
var cors = require('cors');


app.use(cors())
const bodyPaser = require('body-parser')
app.use(bodyPaser.json())
app.use(express.urlencoded({ extended: true }))

const user = require('./routes/users-route')
const component = require('./routes/components-route')
const cart = require('./routes/cart-route')
const order = require('./routes/orders-route')
const payment = require('./routes/payment-route')
const ship = require('./routes/shipping-route')

    app.use('/user', user)
    app.use('/component', component)
    app.use('/cart', cart)
    app.use('/order', order)
    app.use('/payment', payment)
    app.use('/ship', ship)


module.exports = app;
