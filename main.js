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
    console.log('a')
    res.redirect('/loginfailed')
  }
}

const doesInfoExist = (req, res, next) => {
  if (req.body.username && req.body.password) {
    next()
  } else {
    console.log('b')
    res.redirect('/login')
  }
}

app.get('/loginfailed', (req, res) => {
  res.render('login-failed')
})

app.get('/login', (req, res) => {
  res.render('login')
})
app.use(doesInfoExist)
app.use(loginInfo)

app.post('/', (req, res) => {
  res.render('home', req.body)
})

app.listen(3000, function() {
  console.log('Successfully started express application!')
})
