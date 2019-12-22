import express from 'express'
const app = express()
const router = express.Router()

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/login', function (req, res) {
  let {username,token} = req.body
  if (req.session && username && token) {
    req.session.token = token
    req.session.username = username
    req.session.isLogged = true
    res.status(200).json('session stored')
  } else res.status(400).send({ error: 'session store failed!' })
})

router.get('/logout', function (req, res) {
  if (req.session) {
    req.session.token = null
    req.session.username = null
    req.session.isLogged = false
    res.status(200).json('session deleted')
  } else res.status(400).send({ error: 'session delete failed!' })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}

