const express = require('express'),
      routes = express.Router()

routes.use('/view', require('./gui'))
routes.use('/api', require('./user'))

routes.use((req, res) => res.status(404).json({
  message: 'No page here. See API documentation for reference.'
}))

module.exports = routes