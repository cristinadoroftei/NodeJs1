const route = require("express").Router();
const User = require("../models/User");
const Role = require("../models/Role");

const bcrypt = require('bcrypt');
const saltRounds = 12;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';




route.get("/login", (req, res) => {
  const message = req.query.newUserMessage;
  const error = req.query.error;
  res.render("login", {
    pageTitle: "Login",
    newUserMessage: message ? message : "noNewUser",
    error: error ? error : "noError"
  })
})


route.post("/login", (req, res) => {
  //1. retrieve the login details and validate
  const username = req.body.username;
  const password = req.body.password;
  if(username && password){

      //2. check for a user match in database
      User.query().where( {username: username}).then(user => {
        //if user not found in the database, return error 400 
        if(!user){
          return res.status(400).redirect("/login?error=User not found")
        }
         //3. bcrypt compare
         bcrypt.compare(password, user[0].password, (err, result) => {
           if(err){
             return res.redirect("/login?error=Something went wrong")
           }
           if(result){
             return res.redirect("/login?error=Login success")
           }
           return res.redirect("/login?error=Invalid user")
         })
      })
  } else {
    return res.redirect("/login?error=Missing fields")
  }
 
  //4. sessions

});

route.get("/signup", (req, res) => {
  res.render("signup", {
    pageTitle: "Signup",
    error: "noError"
  })
})

route.post("/signup", async (req, res) => {
  // const users = await User.query().select()
  const username = req.body.username;
  const password = req.body.password;
  const passwordRepeat = req.body.passwordRepeat

  const isPasswordTheSame = password === passwordRepeat;

  if (username && password && isPasswordTheSame) {
    if (password.length < 8) {
      return res
        .status(400)
        .render("signup", { 
          error: "Password does not fulfill the requirements",
          pageTitle: "Signup",
         });
    } else {
      try {
        const userFound = await User.query()
          .where({ username: username })
          .limit(1);
        if (userFound.length > 0) {
          return res.render("signup", {
            error: "Username already exists",
            pageTitle: "Signup"});
        }
        else {

          const defaultUserRole = await Role.query().select().where({ role: 'USER'})

          const hashedPassword = await bcrypt.hash(password, saltRounds)


            const newUser = await User.query().insert({
                username: username,
                password: hashedPassword,
                role_id: defaultUserRole[0].id 
              })
          
            return res.redirect("/login?newUserMessage=User has been created: "+ newUser.username);
        }
 
      } catch (error) {
        return res
          .status(500)
          .send({ response: "Something went wrong with the database" });
      }
    }
  } else if (password && passwordRepeat && !isPasswordTheSame) {
    return res
      .status(404)
      .send({
        response: "Password not matching. Fileds: password and passwordRepeat",
      });
  } else {
    return res
      .status(404)
      .send({ response: "Missing fields: username, password, passwordRepeat" });
  }
});




route.get("/logout", (req, res) => {
  //todo: destroy the session
  return res.send({ response: "okok" });
});

module.exports = route;
