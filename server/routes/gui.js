const express = require('express'),
      routes = express.Router(),
      GuiController = require('../controllers/gui.js');

routes.get('/', GuiController.home)

module.exports = routes