const request = require('request')
const env = require('dotenv').config()
const Helpers = require('../hlper/index')


class Controller {
    static getStarred(req, res) {
        var options = {
            url: 'https://api.github.com/user/starred',
            headers: {
                'User-Agent': 'request',
                'Authorization': process.env.REPO_TOKEN
            }
        }
        request(options, function (error, response, body) {
            if (error) {
                console.log(error)
                res.status(500).send('check console')
            } else {
                res.status(200).send(Helpers.filter(body))
                // res.send(body)
            }
        })
    }

    static addRepos(req, res) {
        var options = {
            url: 'https://api.github.com/user/repos',
            headers: {
                'User-Agent': 'request',
                'Authorization': process.env.REPO_TOKEN
            },
            body: JSON.stringify({
                name: req.body.name
            })

        }
        request.post(options, function (err, response, body) {
            if (err) {
                console.log(err)
                res.status(500).send(err.message)
            } else {
                res.status(200).send(body)
            }
        })
    }

    static searchRepos(req, res) {
        var options = {
            url: 'https://api.github.com/user/starred',
            headers: {
                'User-Agent': 'request',
                'Authorization': process.env.REPO_TOKEN
            },
        }
        request(options, function (error, response, body) {
            if (error) {
                console.log(error)
                res.status(500).send('check console')
            } else {
                let data = Helpers.filter(body).filter(el => el.name.includes(req.params.value))
                res.status(200).json(data)

            }
        })
    }

    static viewRepos(req, res) {
        let joinedUrl = 'https://api.github.com/users/' + req.params.username + '/repos'
        console.log(joinedUrl)
        var options = {
            url: joinedUrl,
            headers: {
                'User-Agent': 'request',
                'Authorization': process.env.REPO_TOKEN
            },
        }
        request(options, function (err, response, body) {
            if (err) {
                console.log(err)
                res.status(500).send('check console')
            } else {
                res.status(200).send(Helpers.filter(body))
            }
        })
    }
}

module.exports = Controller