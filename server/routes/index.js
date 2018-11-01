const router = require('express').Router()
const Controller = require('../controllers/index.js')

router.get('/repo-list/star', Controller.renderRepoListStar)
router.get('/repo-list/star/:key/:value', Controller.renderRepoListStarSearch)
router.post('/create-repo', Controller.createRepo)
router.get('/repo-list/:owner', Controller.renderRepoListSearch)
router.delete('/repo-list/:owner/:repo', Controller.repoUnstar)
router.post('/signin', Controller.signIn)

module.exports = router;
