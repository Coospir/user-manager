const express = require('express')
const env = require('dotenv')
const app = express()
const PORT = process.env.PORT || 8080
const morgan = require('morgan')
const bodyParser = require('body-parser')

env.config( {path:'config.env'} )

app.use(morgan('tiny'))

// Parsing body
app.use(bodyParser.urlencoded({ extended: true }))

// Set view engine
app.set('view engine', 'ejs')



app.get('/', (req, res) => {
    res.send('Users Manager')
})

app.listen(3000, () => console.log(`Server is running.. http://localhost:${PORT}`))