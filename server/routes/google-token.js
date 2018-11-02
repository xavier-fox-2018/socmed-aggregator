const router  = require('express').Router()
const Controller = require('../controllers/google-token')

router.post('/postToken',Controller.googleToken )



module.exports = router