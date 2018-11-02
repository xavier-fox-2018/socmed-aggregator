class Helper {
    static filter(inputs) {
        var data = JSON.parse(inputs).map(element =>
            ({
                id: element.id,
                name: element.name,
                owner: element.owner.login,
                url: element.html_url,
                description: element.description,
                language: element.language,
                stargaze: element.stargazers_count
            })
        )
        return data
    }
}

module.exports = Helper