const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const loginInfo = (req, res, next) => {
  if (req.body.username === 'taylorcox' && req.body.password === 'passstuff') {
    next()
  } else {
    res.redirect('/login')
  }
}

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/', (req, res) => {
  res.render('home', req.body)
})

app.use(loginInfo)

app.post('/logged-in', (req, res) => {
  res.render('logged-in', req.body)
})

app.listen(3000, function() {
  console.log('Successfully started express application!')
})
