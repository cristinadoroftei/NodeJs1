const express = require("express")
const app = express()

//body parser
app.use(express.json())

app.get("/", (req,res) => {
    return res.send({response: "okok"})
})


//Setup objection  + knex

//instead of using const Model = require('objection').Model
const { Model } = require('objection')
const Knex = require('knex') //we call the library with capital letters, that's why we use Knex
const knexFile = require('./knexfile.js')

const knex = Knex(knexFile.development)

Model.knex(knex) //inside the Model there is a built-in fucntion called "knex"
                 //which has inside the knex connection



//Add routes
const authRoute = require('./routes/auth.js')
app.use(authRoute)



//Start server
const port = process.env.PORT ? process.env.PORT : 3000; //put the PORT value in a variable
const server = app.listen(port, (error) => {
  if(error){
      console.log(error)
  }
  console.log("System running on port", server.address().port )
});