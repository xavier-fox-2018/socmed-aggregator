const express = require('express')
const app = express()
const port = 3000
const indexRoute = require('./routes/index.js')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//routes
app.use('/hacktivgit', indexRoute)

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})