const sql = require('./db.js')

const Item = function (item) {
  this.id = item.id,
  this.img_link = item.img_link,
  this.author_id = item.author_id,
  this.last_edit_id = item.last_edit_id,
  this.title = item.title,
  this.description = item.description,
  this.post_date = item.post_date,
  this.edit_date = item.edit_date
}


Item.create = (newItem, result) => {
  sql.query('INSERT INTO items SET ?', newItem, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    console.log('created item: ', { newItem })
    result(null, { newItem })
  })
}

Item.getAll = (result) => {
  sql.query('SELECT * FROM items', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log('items: ', res)
    result(null, res)
  })
}

Item.findById = (id, result) => {
  sql.query(`SELECT * FROM items WHERE id = ?`, id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log('found item: ', res[0])
      result(null, res[0])
      return
    }

    result({ kind: 'not_found' }, null)
  })
}

Item.updateById = (item, result) => {
  sql.query(
    'UPDATE items SET title = ?, description = ?, img_link = ?, last_edit_id =?, edit_date =? WHERE id = ?',
    [
      item.title, item.description, item.img_link, item.last_edit_id, item.edit_date, item.id
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null)
        return
      }

      console.log('updated item: ', item)
      result(null, item)
    }
  )
}

Item.remove = (id, result) => {
  sql.query('DELETE FROM items WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null)
      return
    }

    console.log('deleted item with id: ', id)
    result(null, res)
  })
}

Item.removeAll = (result) => {
  sql.query('DELETE FROM items', (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log(`deleted ${res.affectedRows} items`)
    result(null, res)
  })
}

module.exports = Item
