const router = require('express').Router()
const Controller = require('../controllers/reposController')

router.get('/starred', Controller.getStarred)
router.post('/add', Controller.addRepos)
router.get('/search/:value', Controller.searchRepos)
router.get('/views/:username', Controller.viewRepos)

module.exports = router
