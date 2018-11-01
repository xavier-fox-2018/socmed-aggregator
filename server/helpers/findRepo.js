let request = require('request')

function findRepo() {
    return new Promise(function (resolve, reject) {
        let options = {
            url: 'https://api.github.com/user/repos',
            headers: {
                'User-Agent': 'request',
                'Authorization': `token ${process.env.Gittoken}`
            }
        }
        request(options, (error, response, body) => {
            if (error) {
                reject(error)
            } else {
                let parsedData = JSON.parse(body)
                let map = parsedData.map(data => {
                    let content = {}
                    content.id = data.id,
                        content.name = data.name,
                        content.owner = data.owner.login,
                        content.stars = data.stargazers_count
                        content.url = data.html_url
                    return content
                })
                result = map
                resolve(map)
            }
        })
    })
}

module.exports = findRepo