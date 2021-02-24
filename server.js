const express = require('express')
const env = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const connector = require('./server/database/connection')

const app = express()

env.config( {path:'config.env'} )
const PORT = process.env.PORT || 8080

app.use(morgan('tiny'))

// MongoDB Connection
connector()

// Parsing body
app.use(bodyParser.urlencoded({ extended: true }))

// Set view engine
app.set('view engine', 'ejs')
//app.set('views', path.resolve(__dirname, "views/ejs"))

// Load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.use('/', require('./server/routes/router'))

app.listen(3000, () => console.log(`[|] Server is running.. http://localhost:${PORT}`))