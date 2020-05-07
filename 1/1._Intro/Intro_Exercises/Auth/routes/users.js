const router = require('express').Router()

const User = require('../models/User')

router.get("/users/roles", async(req,res) => {
    const result = await User.query().column('username').select().withGraphFetched('role')
    return res.send({response: result})
  })

router.get('/setsessionvalue/:value', (req, res) => {
  const value = req.params.value
  req.session.myValue = value
  return res.send({response: {}})
})

router.get('/getsessionvalue', (req, res) => {
  return res.send({response: req.session.myValue})
})

module.exports = router