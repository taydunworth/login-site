const express = require('express')
const path = require('path')
const mustacheExpress = require('mustache-express')
const expressSession = require('express-session')

const app = express()

app.use(express.static('public'))
app.engine('mustache', mustacheExpress())

app.set('views', './views')
app.set('view engine', 'mustache')

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }

app.get('/', function(req, res) {
  res.render('home')
})

app.post('/logged-in', (req, res) => {
  res.render('logged-in')
})

app.post('/', (req, res) => {
  res.render('logged-in')
})

app.listen(3000, function() {
  console.log('Successfully started express application!')
})
