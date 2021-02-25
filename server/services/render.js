const axios = require('axios')

exports.homeRoutes = (req, res) => {
    // Making a GET / request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function (response){
        res.render('index', { players: response.data })
    }).catch(err => {
        res.send(err)
    })

}

exports.add_user = (req, res) => {
    res.render('add_user')
}

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id : req.query.id } } )
        .then((playerData) => {
            res.render("update_user", { players : playerData.data})
        })
        .catch( err => {
            res.send(err)
        })
}