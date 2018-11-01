require('dotenv').config()
const request = require('request')
const findRepo = require('../helpers/findRepo.js')
const User = require('../models/user.js')
const createJWTToken = require('../helpers/createJWT_Token.js')
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "1032017412855-ql6tievj34f1p5mpa4thb45l9vqigvu9.apps.googleusercontent.com"

class Controllers {
    static signIn(req, res) {
        const client = new OAuth2Client(CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.google_token,
            audience: CLIENT_ID
        }, function (err, result) {
            if (err) {
                console.log(err)
                res.status(500).json(
                    {
                        message: err.message,
                        note: 'Please see console log for further details'
                    })
            } else {
                const payload = result.getPayload()
                //check if the email is already in database
                User
                    .findOne({
                        email: payload.email
                    })
                    .then(data => {
                        if (data) {
                            //create token if user is already registered
                            return createJWTToken(data)
                                .then(token => {
                                    res.status(201).json({ message: 'Successfully signed in. Please take note of your token', token: token })
                                })
                        } else {
                            console.log('No User Found')
                            //create new User and save to DB
                            let newUser = new User({
                                email: payload.email,
                                name: payload.name
                            })
                            return newUser.save()
                                .then(data => {
                                    //make JWT Token
                                    return createJWTToken(data)
                                })
                                .then(token => {
                                    res.status(201).json({ message: 'User successfully created. Please take note of your token', token: token })
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).json(
                                        {
                                            message: err.message,
                                            note: 'Please see console log for further details'
                                        })
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json(
                            {
                                message: err.message,
                                note: 'Please see console log for further details'
                            })
                    })
            }
        })
    }
    static renderRepoListStar(req, res) {
        findRepo()
            .then(data => {
                let filteredData = data.filter(result => result.stars > 0)
                res.status(200).json(
                    {
                        message: 'Success! Here is a list of the GitHub Repos',
                        data: filteredData
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(
                    {
                        message: err.message,
                        note: 'Please see console log for further details'
                    })
            })
    }
    static renderRepoListStarSearch(req, res) {
        findRepo()
            .then(data => {
                //use == instead of === so that it can match numbers if the value is a number(since the params makes it a string and not number)
                let filteredData = data.filter(result => result.stars > 0 && result[req.params.key] == req.params.value)
                res.status(200).json(
                    {
                        message: 'Success! Here is a list of the GitHub Repos',
                        data: filteredData
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(
                    {
                        message: err.message,
                        note: 'Please see console log for further details'
                    })
            })
    }
    static createRepo(req, res) {
        let options = {
            url: 'https://api.github.com/user/repos',
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${process.env.Gittoken}`
            },
            body: JSON.stringify(
                {
                    name: req.body.name
                })
        }
        request.post(options, (err, httpResponse, body) => {
            if (err) {
                console.log(err)
                res.status(500).json(
                    {
                        message: err.message,
                        note: 'Please see console log for further details'
                    })
            } else {
                res.status(201).json(
                    {
                        message: 'Success! Repo has been created',
                    })
            }
        })
    }
    static renderRepoListSearch(req, res) {
        //a bit repretitive since the only difference with helper is the options
        //have not found way so that the helper would be the request
        let options = {
            url: `https://api.github.com/users/${req.params.owner}/repos`,
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${process.env.Gittoken}`
            }
        }
        request(options, (error, response, body) => {
            if (error) {
                console.log(err)
                res.status(500).json(
                    {
                        message: err.message,
                        note: 'Please see console log for further details'
                    })
            } else {
                let parsedData = JSON.parse(body)
                let map = parsedData.map(data => {
                    let content = {}
                    content.id = data.id,
                        content.name = data.name,
                        content.owner = data.owner.login,
                        content.stars = data.stargazers_count,
                        content.url = data.html_url
                    return content
                })
                res.status(200).json(
                    {
                        message: 'Success! Here is a list of the GitHub Repos',
                        data: map
                    })
            }
        })
    }
    static repoUnstar(req, res) {
        let options = {
            url: `https://api.github.com/user/starred/${req.params.owner}/${req.params.repo}`,
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${process.env.Gittoken}`
            },
        }
        request.delete(options, (err, response, body) => {
            if (err) {
                console.log(err)
                res.status(500).json(
                    {
                        message: err.message,
                        note: 'Please see console log for further details'
                    })
            } else {
                if (body.length === 0) {
                    res.status(200).json(
                        {
                            message: 'Success! Repo has been unstarred',
                        })
                } else {
                    res.status(400).json(
                        {
                            message: 'Please double check the owner and repo inputted',
                        })
                }
            }
        })
    }
}

module.exports = Controllers