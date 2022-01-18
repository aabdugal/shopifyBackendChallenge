const User = require('../models/user.model.js')
const sql = require('../models/db.js')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  const user = new User({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    birthday: req.body.birthday,
    city: req.body.city,
    country: req.body.country,
    gender: req.body.gender,
  })

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      })
    else res.send(data)
  })
}

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      })
    else res.send(data)
  })
}

exports.findOne = (req, res) => {
  User.findById(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with username ${req.params.username}.`,
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving User with username ' + req.params.username,
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
  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    birthday: req.body.birthday,
    city: req.body.city,
    country: req.body.country,
    gender: req.body.gender,
  })

  User.updateById(req.params.username, user, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with username ${req.params.username}.`,
        })
      } else {
        res.status(500).send({
          message:
            'Error updating username with username ' + req.params.username,
        })
      }
    } else res.send(data)
  })
}

exports.delete = (req, res) => {
  console.log(req.params.username)
  User.remove(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with username ${req.params.username}.`,
        })
      } else {
        res.status(500).send({
          message: 'Could not delete User with username ' + req.params.username,
        })
      }
    } else res.send({ message: `User was deleted successfully!` })
  })
}

exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all users.',
      })
    else res.send({ message: `All users were deleted successfully!` })
  })
}

exports.login = (req, res) => {
  if (!req.body || !req.body.password) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }
  User.findById(req.body.username, (err, data) => {
    if (err || data == null) {
      res.status(500).send({
        message: 'Error retrieving User with username ' + req.params.username,
      })
    } else {
      if (data != null && req.body.password != data.password) {
        res.status(500).send({
          message: 'Wrong password!',
        })
      } else {
        res.status(200).send(data)
      }
    }
  })
}

exports.getFriends = (req, result) => {
  sql.query(
    `SELECT * 
    FROM
    (
    SELECT user2 as friend FROM friends WHERE user1 = ?
    UNION 
    SELECT user1 as friend FROM friends WHERE user2 = ?) as a
    INNER JOIN users b
    ON b.username = a.friend;`,
    [req.params.username, req.params.username],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving user friends.',
        })
        return
      }
      console.log(res)
      result.send(res)
    }
  )
}

exports.deleteFriend = (req, result) => {
  user1 = req.params.username
  user2 = req.body.friend_id
  if (user1.localeCompare(user2) > 0) {
    ;[user1, user2] = [user2, user1]
  }
  console.log(user1, user2)

  sql.query(
    'DELETE FROM friends WHERE user1 = ? and user2 = ?',
    [user1, user2],
    (err, res) => {
      if (err) {
        result.status(404).send({
          message: `Not found Post with post_id .`,
        })
      }

      result.send({ message: `Friend was deleted successfully!` })
    }
  )
  // sql.query(
  //   'DELETE FROM friends WHERE user1 = ? AND user2 = ?',
  //   [user1, user2],
  //   (err, res) => {
  //     if (err) {
  //       console.log('error: ', err)
  //       result.status(500).send({
  //         message:
  //           err.message || 'Some error occurred while retrieving friends.',
  //       })
  //       return
  //     }
  //     console.log('deleted friend:', user1, user2)
  //     result.send({ message: `Friend was deleted successfully!` })
  //   }
  // )
}
