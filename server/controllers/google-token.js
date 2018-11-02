const { OAuth2Client } = require('google-auth-library');
const Model = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class Controller {

    static googleToken(req, res) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        }, function (err, data) {
            const payload = data.getPayload()
            Model.findOne({
                email: payload.email
            })
                .then(data => {
                    if (data == null) {
                        return Model.create({
                            name: payload.name,
                            email: payload.email
                        })
                    } else {
                        let jwtData ={
                            name: data.name,
                            email: data.email
                        }
                        return jwt.sign(jwtData, process.env.JWT_SECRET)
                    }
                })
                .then(data => {
                    if (typeof data == 'string'){
                        res.send(data)
                    } else {

                    }
                })
                .catch(err => {
                    console.log(err.message)
                })
        })
    }

}

module.exports = Controller