let playerDB = require('./../model/model')

// Create and save new player

exports.create = (req, res) => {
    // Validate request
    if( !req.body ) {
        res.status(400).send({ message: '[!] Content cannot be empty! ' })
        return
    }

    // New player
    const player = new playerDB({
        steamID: req.body.steamID,
        gender: req.body.gender,
        rank: req.body.rank,
        weapon: req.body.weapon
    })

    // Save player in DB
    player.save().then(data => {
        //res.send(data)
        res.redirect('/add-user')
    }).catch(err => {
        res.status(500).send({
            message: err.message || '[!] Some error occurred while creating a player!'
        })
    })
}

// Retrieve and return all users / single user

exports.find = (req, res) => {

    if(req.query.id) {
        const id = req.query.id

        playerDB.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({ message: `[!] Not founded user with ID: ${id}!`})
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send( { message: err.message || `[!] Error retrieving user with ID: ${id}!`})
            })
    } else {
        playerDB.find()
            .then(player => {
                res.send(player)
            })
            .catch(err => {
                res.status(500).send( {message: err.message || '[!] Error occurred while finding player information!'})
            })
    }

}

// Update a new identified user by id

exports.update = (req, res) => {
    if( !req.body ) {
        return res
            .status(400)
            .send({ message: '[!] Data to update player can not be empty!'})
    }

    const id = req.params.id
    playerDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then( data => {
            if ( !data ) {
                res.status(404).send({ message : `[!] Cannot update player with ID: ${id}. Maybe player not found? `})
            } else {
                res.send( data )
            }
        })
        .catch( err => {
            res.status(500).send( { message : err.message || '[!] Error in updating player information ...'})
        })
}

// Delete a user with user id

exports.delete = (req, res) => {
    const id = req.params.id
    playerDB.findByIdAndDelete(id)
        .then( data => {
            if ( !data ) {
                res.status(404).send( { message : `[!] Cannot delete player with ID: ${id}. Maybe it is wrong?`})
            } else {
                res.send( {
                    message: '[|] User was deleted successfully!'
                })
            }
        })
        .catch( err => {
            res.status(500).send({
                message : err.message || `[!] Cannot delete player with ID: ${id}!`
            })
        })
}