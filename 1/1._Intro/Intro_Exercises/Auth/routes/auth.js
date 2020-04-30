const route = require("express").Router();

route.post("/login", (req,res) => {
    return res.send({response: "okok"})
})

route.post("/signup", (req,res) => {
    return res.send({response: "okok"})
})

route.get("/", (req,res) => {
    return res.send({response: "okok"})
})


module.exports = route