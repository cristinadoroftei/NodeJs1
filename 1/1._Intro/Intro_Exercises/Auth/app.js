const express = require("express");
const app = express();


const session = require('express-session')



//body parser
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: require('./config/mysqlCredentials.js').sessionSecret,
  resave: false,
  saveUninitialized: true,
}))

const rateLimit = require("express-rate-limit")
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 8 // limit each IP to 100 requests per windowMs
// });

// app.use("/login", limiter )
// app.use("/signup", limiter)
//Setup objection  + knex

//instead of using const Model = require('objection').Model
const { Model } = require("objection");
const Knex = require("knex"); //we call the library with capital letters, that's why we use Knex
const knexFile = require("./knexfile.js");

const knex = Knex(knexFile.development);

Model.knex(knex); //inside the Model there is a built-in fucntion called "knex"
//which has inside the knex connection

//Add routes
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js")
app.use(authRoute);
app.use(usersRoute);

app.use(express.static('views'))
app.use(express.static('public'))

app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("index", {
    pageTitle: "Index"
  })
})

app.get("/1", (req, res) => {
  return knex("users")
    .select()
    .then((users) => {
      return res.send({ response: users });
    });
});

app.get("/2", async(req,res) => {
  const result = await knex('users').select();
  return res.send({response: result})
})



//Start server
const port = process.env.PORT ? process.env.PORT : 3000; //put the PORT value in a variable
const server = app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("System running on port", server.address().port);
});
