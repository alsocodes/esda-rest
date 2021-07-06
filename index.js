const express = require('express')
const app = express()
const port = 3009;
const cors = require('cors')
const md5 = require('md5')

const mysql = require('mysql')
const conn = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'e_retribusi_pasar'
})

conn.connect()

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads

const jwt = require('./jwt')


app.get('/', (req, res) => {
   // res.send('Hello World!')
   res.send(md5("123456"))
})

app.post('/login', (req, res) => {
   let q = `CALL sp_admin_login("` + req.body.username + `","` + md5(req.body.password) + `")`;
   conn.query(q, (err, rows) => {
      let row = rows[0][0];

      if (row.status == 1) {
         let token = jwt.generateAccessToken({ adminid:row.id, username: row.username, nama: row.nama, role: row.role }, 1111200)
         row.token = token
      }

      res.send(row)

   })
})

// opt

app.get("/admin-free/:id", jwt.authenticateToken, (req, res) =>{
   let sql = `CALL sp_admin_free(`+req.params.id+`)`;
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0])
   })
})

// pasar

app.get("/pasar", jwt.authenticateToken, (req, res) => {
   let sql = `CALL sp_pasar_read(`+req.user.adminid+`,"`+req.user.role+`")`;
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0])
   })
})

app.get("/pasar/:id", jwt.authenticateToken, (req, res) => {
   let sql = `CALL sp_pasar_detail(`+req.params.id+`)`;
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.post("/pasar", jwt.authenticateToken, (req, res)=>{
   let sql = `CALL sp_pasar_create(`+req.body.admin+`, '`+req.body.nama+`')`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.put("/pasar", jwt.authenticateToken, (req, res)=>{
   let sql = `CALL sp_pasar_edit(`+req.body.id+`,`+req.body.admin+`, '`+req.body.nama+`')`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.delete("/pasar/:id", jwt.authenticateToken, (req, res)=>{
   let sql = `CALL sp_pasar_delete(`+req.params.id+`)`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})


// bangunan

app.get("/bangunan", jwt.authenticateToken, (req, res) => {
   let sql = `CALL sp_bangunan_read()`;
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0])
   })
})

app.get("/bangunan/:id", jwt.authenticateToken, (req, res) => {
   let sql = `CALL sp_bangunan_detail(`+req.params.id+`)`;
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.post("/bangunan", jwt.authenticateToken, (req, res)=>{
   let sql = `CALL sp_bangunan_create('`+req.body.nama+`', '')`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.put("/bangunan", jwt.authenticateToken, (req, res)=>{
   let sql = `CALL sp_bangunan_edit(`+req.body.id+`,'`+req.body.nama+`', '')`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.delete("/bangunan/:id", jwt.authenticateToken, (req, res)=>{
   let sql = `CALL sp_bangunan_delete(`+req.params.id+`)`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})



// admin

app.get("/admin", jwt.authenticateToken, (req, res) => {
   let sql = `CALL sp_admin_read()`;
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0])
   })
})

app.get("/admin/:id", jwt.authenticateToken, (req, res) => {
   let sql = `CALL sp_admin_detail(`+req.params.id+`)`;
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.post("/admin", jwt.authenticateToken, (req, res)=>{
   let sql = `CALL sp_admin_create(
      '`+req.body.username+`', 
      '`+md5(req.body.password)+`', 
      '`+req.body.nama+`' 
   )`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.put("/admin", jwt.authenticateToken, (req, res)=>{
   let password = req.body.password ? md5(req.body.password) : '';
   let sql = `CALL sp_admin_update(
      `+req.body.id+`,
      '`+req.body.username+`',
      '`+password+`',
      '`+req.body.nama+`'
   )`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.delete("/admin/:id", jwt.authenticateToken, (req, res)=>{
   let sql = `CALL sp_admin_delete(`+req.params.id+`)`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})



// blok

app.get("/blok", jwt.authenticateToken, (req, res) => {
   let sql = `CALL sp_blok_read(`+req.user.adminid+`)`;
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0])
   })
})

app.get("/blok/:id", jwt.authenticateToken, (req, res) => {
   let sql = `CALL sp_blok_detail(`+req.params.id+`)`;
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.post("/blok", jwt.authenticateToken, (req, res)=>{
   let sql = `CALL sp_blok_create(
      '`+req.body.no_kartu+`',
      `+req.body.id_pasar+`,
      `+req.body.id_bangunan+`,
      '`+req.body.blok+`',
      '`+req.body.nama_pedagang+`',
      '`+req.body.jenis_dagangan+`',
      `+req.body.tarif+`
   )`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.put("/blok", jwt.authenticateToken, (req, res)=>{
   let sql = `CALL sp_blok_update(
      `+req.body.id+`,
      '`+req.body.no_kartu+`',
      `+req.body.id_pasar+`,
      `+req.body.id_bangunan+`,
      '`+req.body.blok+`',
      '`+req.body.nama_pedagang+`',
      '`+req.body.jenis_dagangan+`',
      `+req.body.tarif+`
   )`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.delete("/blok/:id", jwt.authenticateToken, (req, res)=>{
   let sql = `CALL sp_blok_delete(`+req.params.id+`)`;
   conn.query(sql, (err, rows) => {
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.get("/checkkartutopup/:id", jwt.authenticateToken, (req, res) => {
   let sql = `CALL sp_topup_check_kartu('`+req.params.id+`')`;
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.post("/processtopup", jwt.authenticateToken, (req, res) => {
   let id_admin = req.user.adminid
   let id_pedagang = req.body.id
   let jenis = 'topup'
   let nilai = req.body.nilai

   let sql = `CALL sp_transaksi_create(
      `+id_admin+`,
      `+id_pedagang+`,
      '`+jenis+`',
      `+nilai+`
   )`;
   
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.get("/checkkartubayar/:id", jwt.authenticateToken, (req, res) => {
   let sql = `CALL sp_topup_check_kartu('`+req.params.id+`')`;
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0][0])
   })
})

app.post("/processbayar", jwt.authenticateToken, (req, res) => {
   let id_admin = req.user.adminid
   let id_pedagang = req.body.id
   let jenis = 'topup'
   let nilai = req.body.nilai

   let sql = `CALL sp_transaksi_create(
      `+id_admin+`,
      `+id_pedagang+`,
      '`+jenis+`',
      `+nilai+`
   )`;
   
   conn.query(sql, (err, rows) =>{
      if (err) throw err
      res.send(rows[0][0])
   })
})
// conn.end()
app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})