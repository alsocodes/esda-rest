const express = require('express')
const app = express()
const port = 3009

var mysql = require('mysql')
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'dbuser',
  password: 's3kreee7',
  database: 'my_db'
})

conn.connect()

conn.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// conn.end()
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})