const db = require("../models");
const UserCart = db.userCart;


// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if (!req.body.userId) {
        return res.status(400).send({
            message: "userId name can not be empty"
        });
    }

    // Create a Note
    const userCart = new UserCart(req.body);

    // Save Note in the database
    userCart.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the userCart."
            });
        });
};

// Retrieve and return all notes from the database.
exports.find = (req, res) => {
    UserCart.find(req.query)
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving userCart."
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "userCart content can not be empty"
        });
    }

    // Find note and update it with the request body
    UserCart.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "userCart not found with id " + req.params.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "userCart not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating userCart with id " + req.params.id
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    UserCart.deleteOne({userId:req.query.userId})
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "userCart not found with id " + req.quey.userId
                });
            }
            res.send({ message: "Class deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "userCart not found with id " + req.quey.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete userCart with id " + req.quey.userId
            });
        });
};
