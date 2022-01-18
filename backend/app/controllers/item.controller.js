const Item = require('../models/item.model.js')
const sql = require('../models/db.js')
const s3_handler = require('../utils/s3_handler.js')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  const item = new Item({
    id: req.body.id,
    img_link: req.body.img_link,
    author_id: req.body.author_id,
    last_edit_id: null,
    title: req.body.title,
    description: req.body.description,
    post_date: new Date(),
    edit_date: null,
  })
  console.log(new Date())
  Item.create(item, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Item.',
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  Item.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving item.',
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  Item.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Item with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving Item with id ' + req.params.id,
        })
      }
    } else res.send(data)
  })
}

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }
  const item = new Item({
    id: req.params.id,
    img_link: req.body.img_link,
    last_edit_id: req.body.last_edit_id,
    title: req.body.title,
    description: req.body.description,
    edit_date: new Date(),
  })

  Item.updateById(item, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Item with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Error updating Item with id ' + req.params.id,
        })
      }
    } else res.send(data)
  })
}

exports.delete = (req, res) => {
  Item.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Item with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Could not delete Item with id ' + req.params.id,
        })
      }
    } else res.send({ message: `Item was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  Item.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all items.',
      })
    else res.send({ message: `All items were deleted successfully!` })
  })
}

exports.uploadPhoto = async (req, res) => {
  if (!req.files || !req.files.file) {
    res.status(400).send({ message: 'file can not be empty.' })
    return
  }

  const file = req.files.file
  // // Validate file is an image
  // if (
  //   !file.mimetype.startsWith('image') &&
  //   !file.mimetype.startsWith('application/octet-stream')
  // ) {
  //   res.status(400).send({ message: 'file must be type image.' })
  //   return
  // }

  // Save the trip_photo to the database
  const data = await s3_handler.upload(file).catch((err) => {
    res.status(500).send({
      message: err.message || 'Failed to upload image.',
    })
    return
  })
  console.log(data)
  res.status(200)
}
