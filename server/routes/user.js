const express = require('express'),
  routes = express.Router(),
  RepoController = require('../controllers/user.js');


  routes.post('/gsignin', RepoController.gSignIn) // ! handles signing in from google
  routes.post('/gsignout', RepoController.gSignOut) // ! handles signing out from google
  routes.get('/repo', RepoController.repo) // find all repo and you can insert query
  routes.get('/repo/star', RepoController.repoStar) // find all starred
  routes.get('/repo/star/:id', RepoController.repoStarId) // search star by id
  routes.post('/repo', RepoController.repoCreate) // make new repo
  routes.delete('/unstar/:name/:repoName', RepoController.repoStarDelete) // delete a repo from starred
  routes.put('/star/:name/:repoName', RepoController.repoStarPut) // add a repo to starred
  routes.get('/:name', RepoController.repoParams) // find all repo from a user

module.exports = routes