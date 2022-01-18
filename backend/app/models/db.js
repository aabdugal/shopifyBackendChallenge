const mysql = require('mysql')
const dbConfig = require('../config/db.config.js')

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
  dateStrings: true
})

connection.connect((error) => {
  if (error) throw error
  console.log('Successfully connected to the database.')
})

connection.query('USE inventory;')
module.exports = connection
