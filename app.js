const express = require('express')  //deklarate express
const mysql = require('mysql')     //import plugin mysql install npm install --save mysql
const parser = require('body-parser') //plugin body parser install npm install --save body-parser
const app = express()
app.use(parser.json())
var cors = require('cors');
app.use(cors());
const port = 5000  //set port express
//setup connection database mysql

const connection = mysql.createConnection({
  host     : 'localhost',  //your localhost
  user     : 'root',      //your sql user
  password : 'root',      //your sql password
  database : 'arkademy_rifqi' //your database name
});

connection.connect()

//router get all data
app.get('/getdatas', (req,res) => {
  connection.query('SELECT * FROM contact', (err, row, fields) => {
    res.send(row)
  })
})

//router get data where condition
app.get('/getdata', (req,res) => {
  connection.query('SELECT * FROM contact where id='+req.query.id, (err, row, fields) => {
    res.send(row)
  })
})

//router for search data
app.get('/search', (req,res) => {
  connection.query('SELECT * FROM contact where name LIKE "%'+req.query.name+'%"', (err, row, fields) => {
    res.send(row)
  })
})


//router post for input data
app.post('/postdata', (req, res) => {
  let name = req.body.name
  let company = req.body.company 
  let ponsel = req.body.ponsel
  let email = req.body.email

  connection.query('insert into contact \
  (name, company, ponsel, email) \
  value("'+name+'","'+company+'","'+ponsel+'","'+email+'")', (err, respon) => {
    (!err) ? res.send('sukses') : console.log(err)
  })
  
})

//routerupdate for update data
app.put('/updatedata', (req, res) => {
  let id = req.query.id
  let name = req.body.name
  let company = req.body.company 
  let ponsel = req.body.ponsel
  let email = req.body.email

  connection.query('update contact set \
  name="'+name+'", company="'+company+'", ponsel="'+ponsel+'", email="'+email+'"\
   where id="'+id+'"', (err, respon) => {
    (!err) ? res.send('sukses') : console.log(err)
  })
  
})

//router delete for delete data
app.delete('/deldata', (req, res) => {
  let id = req.query.id
  connection.query('delete from contact where id='+id, (err, respon) => {
    (!err) ? res.send('sukses') : console.log(err)
  })
  
})


app.listen(port,()=> console.log('connect'))