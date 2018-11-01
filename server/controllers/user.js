const request = require('request'),
      { OAuth2Client } = require('google-auth-library'),
      client = new OAuth2Client("1098726616042-vknuh9sb65226gki3u9a6u75ibq90414.apps.googleusercontent.com"),
      jwt = require('jsonwebtoken')
      require('dotenv').config(),
      User = require('../models/user'),
      ObjectId = require('mongodb').ObjectId;
  

class RepoController {

  // ? DONE
  static repo (req, res) {
    const options = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'User-agent': 'request',
        'Authorization': `token ${process.env.TOKEN}`
      }
    }

    request(options, (err, response, body) => {
      res.json(JSON.parse(response.body))
    })
  }

  // ? DONE
  static repoStar (req, res) {

    const options = {
      url: 'https://api.github.com/user/starred',
      headers: {
        'User-agent': 'request',
        'Authorization': `token ${process.env.TOKEN}`
      }
    }

    // res.json(isEmpty(req.query))
    // res.json(req.query)

    if (Object.getOwnPropertyNames(req.query).length === 0) {
      request(options, (err, response, body) => {
        res.json(JSON.parse(response.body))
      })
    }
    else {
      request(options, (err, response, body) => {
        let responseParse = JSON.parse(response.body)

        let key = Object.entries(req.query)[0][0]
        let value = Object.entries(req.query)[0][1]

        key === ("id" || "owner.id") ? value = Number(value) :
          key === ("private" || "owner.site_admin" || "fork") ? value = Boolean(value) : ''

        for (let i = 0; i < responseParse.length; i++) {
          if (responseParse[i][key] === value) {
            res.json(responseParse[i])
          }
        }
      })
    }
  }

  // ? DONE
  static repoStarId(req, res) {
    const options = {
      url: 'https://api.github.com/user/starred',
      headers: {
        'User-agent': 'request',
        'Authorization': `token ${process.env.TOKEN}`
      }
    }

    // res.json(options.url)

    request(options, (err, response, body) => {
      let responseParse = JSON.parse(response.body)

      for (let i = 0; i < responseParse.length; i++) {
        if (responseParse[i].id === Number(req.params.id)) {
          res.json(responseParse[i])
        }
      } 
    })
  }

  // ? DONE
  static repoStarQuery(req, res) {
    const options = {
      url: 'https://api.github.com/user/starred',
      headers: {
        'User-agent': 'request',
        'Authorization': `token ${process.env.TOKEN}`
      }
    }

    request(options, (err, response, body) => {
      let responseParse = JSON.parse(response.body)
      
      
      let key = Object.entries(req.query)[0][0]
      let value = Object.entries(req.query)[0][1]

      key === ("id" || "owner.id") ? value = Number(value) :
      key === ("private" || "owner.site_admin" || "fork") ? value = Boolean(value) : ''

      for (let i = 0; i < responseParse.length; i++) {
        if (responseParse[i][key] === value) {
          res.json(responseParse[i])
        }
      }
    })
  }

  // ? DONE
  static repoCreate (req, res) {
    console.log(req.body)
    const inp = req.body
    const options = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'User-agent': 'request',
        'Authorization': `token ${process.env.TOKEN}`
      },
      body: JSON.stringify({
        name: inp.name,
        description: inp.description,
        homepage: inp.homepage,
        private: Boolean(inp.private)
      })
    }

    request.post(options, (err, response, body) => {
      res.json(JSON.parse(response.body))      
    })
  }

  // ? DONE
  static repoStarDelete(req, res) {
    const inp = req.body
    const options = {
      url: `https://api.github.com/user/starred/${req.params.name}/${req.params.repoName}`,
      headers: {
        'User-agent': 'request',
        'Authorization': `token ${process.env.TOKEN}`
      }
    }

    request.del(options, (err, response, body) => {
      res.json(JSON.parse(response.body))
    })
  }
  
  // ? DONE
  static repoStarPut(req, res) {
    const inp = req.body
    const options = {
      url: `https://api.github.com/user/starred/${req.params.name}/${req.params.repoName}`,
      headers: {
        'User-agent': 'request',
        'Authorization': `token ${process.env.TOKEN}`
      }
    }

    request.put(options, (err, response, body) => {
      res.json({
        err: err,
        response: response,
        body: body
      })
      // res.json(JSON.parse(response.body))
    })
  }

  // ? DONE
  static repoParams(req, res) {
    const options = {
      url: `https://api.github.com/users/${req.params.name}/repos`,
      headers: {
        'User-agent': 'request',
        'Authorization': `token ${process.env.TOKEN}`
      }
    }

    request(options, (err, response, body) => {
      res.json(JSON.parse(response.body))
    })
  }

  // ! NOT DONE
  static gSignOut (req, res) {
    // kirim token dari 
    let user = jwt.verify(req.body.token, "dali")
    console.log(`ini user yang abis di verify`, user)
    User.updateOne({ userId: user.userId }, { $set: { signIn: false } }, (err, docs) => {
      if (err) console.log(`ini berhasil:`, docs)
      else console.log(`ini gagal`, err)
    })
    res.json({
      message: "success"
    })
  }

  // ? DONE
  static gSignIn(req, res) {
    var encoded;
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: "1098726616042-vknuh9sb65226gki3u9a6u75ibq90414.apps.googleusercontent.com"
    }, (err, result) => {
      // res.json(result)
      if (err) {
        res.status(500).json({
          message: "error"
        })
      } else {
        const payload = result.getPayload(),
              toJWT = {
                name: payload['name'],
                email: payload['email'],
                userId: payload['sub'],
                signIn: true
              }
        User.find({ userId: payload['sub'] }, (err, docs) => {
          if (err) {}
          else if (docs) {
            if (docs[0]) {
              User.update({ userId: payload['sub'] }, { $set: { signIn: true } }, (err, docs) => {
                if (docs) {
                  res.json({
                    data: jwt.sign(toJWT, "dali")
                  })
                } else {
                  res.json({
                    message: "error"
                  })
                }
              })
              
            } else {
              encoded = jwt.sign(toJWT, "dali")

              let newUser = new User(toJWT)

              newUser.save()
                .then(data => {
                  res.json({
                    data: encoded
                  })
                })
                .catch(err => console.log(err))

              
            }
          }
        })
      }
    })
  }
}

module.exports = RepoController