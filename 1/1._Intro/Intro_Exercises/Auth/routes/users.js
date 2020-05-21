const router = require('express').Router()

const User = require('../models/User')
const Dog = require('../models/Dog.js')

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

router.get("/dogs", async (req, res) => {
  const session = req.session.value;
  const sessionIsAdmin = req.session.isAdmin;
  if (!session) {
    return res.redirect("/login")
  } else {
    const dogs = await Dog.query();
    console.log(dogs);
    return res.render("dogs", {
      pageTitle: "Dogs",
      dogs: dogs,
      userSession: session,
      isAdmin : sessionIsAdmin? sessionIsAdmin : false
    })
  }
})

module.exports = router