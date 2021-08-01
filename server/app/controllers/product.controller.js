const db = require("../models");
const Product = db.product;

// Retrieve and return all notes from the database.
exports.find = (req, res) => {
    Product.find(req.query)
    .then(notes => {
      res.send(notes);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
  };

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    
    //Find note and update it with the request body
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "product not found with id"+req.query.id
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "product not found with id"+req.query.id
                });
            }
            return res.status(500).send({
                message: "Error updating product with id"+req.query.id
            });
        });
};