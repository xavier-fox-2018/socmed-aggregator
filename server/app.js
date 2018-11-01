// ! BASIC CONFIG
const express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  routes = require('./routes'),
  cors = require('cors'),
  gal = require('google-auth-library'),
  mongoose = require('mongoose')

app.use(cors())
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use(routes)

mongoose.connect('mongodb://localhost/ubergit')
app.listen(port, () => console.log(`Listening on ${port}`))