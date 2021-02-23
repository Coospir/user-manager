const express = require('express')
const env = require('dotenv')
const app = express()

env.config()
const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send('Users Manager')
})

app.listen(3000, () => console.log(`Server is running.. http://localhost:${PORT}`))