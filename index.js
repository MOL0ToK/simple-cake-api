const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uniqid = require('uniqid')

const db = require('./db')

const JWT_KEY = 'supersecretkey'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/register', async function(req, res) {
  const { email, password } = req.body
  if (email && password) {
    if (db.users.some(user => user.email === email)) {
      return res.send('Такой email уже зарегистрирован')
    } else {
      const hash = await bcrypt.hash(password, 5)
      const userId = uniqid()
      const token = await jwt.sign({ userId }, JWT_KEY)

      db.users.push({
        id: uniqid(),
        email,
        password: hash
      })

      return res.json({
        token
      })
    }
  } else {
    return res.send('Ошибка передачи email или password')
  }
})

app.post('/login', async function(req, res) {
  const { email, password } = req.body
  if (email && password) {
    const user = db.users.find(user => user.email === email)
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        const token = await jwt.sign({ userId: user.id }, JWT_KEY)

        return res.json({
          token
        })
      } else {
        return res.send('Пароль не подходит')
      }
    } else {
      return res.send('Пользователя с таким email не существует')
    }
  } else {
    return res.send('Ошибка передачи email или password')
  }
})

// app.post('/createOrder', async function(req, res) {})

app.listen(3000)
