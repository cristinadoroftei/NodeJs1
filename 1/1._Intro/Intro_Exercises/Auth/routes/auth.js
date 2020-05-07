const route = require("express").Router();
const User = require("../models/User");
const Role = require("../models/Role");

const bcrypt = require('bcrypt');
const saltRounds = 12;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


route.post("/login", (req, res) => {
  //1. retrieve the login details and validate
  //2. check for a user match in database
  //3. bcrypt compare
  //4. sessions
  bcrypt.compare("ffff", "fkhf", function(err, result) {
    // result == true
});
  return res.send({ response: "okok" });
});

route.post("/signup", async (req, res) => {
  // const users = await User.query().select()
  const { username, password, passwordRepeat } = req.body;

  const isPasswordTheSame = password === passwordRepeat;

  if (username && password && isPasswordTheSame) {
    if (password.length < 8) {
      return res
        .status(400)
        .send({ response: "Password does not fulfill the requirements" });
    } else {
      try {
        const userFound = await User.query()
          .where({ username: username })
          .limit(1);
        if (userFound.length > 0) {
          return res.send({ response: "Username already exists" });
        }

        
        else {

          const defaultUserRole = await Role.query().select().where({ role: 'USER'})

          const hashedPassword = await bcrypt.hash(password, saltRounds)


            const newUser = await User.query().insert({
                username: username,
                password: hashedPassword,
                role_id: defaultUserRole[0].id 
              })
          
            return res.send({ response: 'User has been created: ' + newUser.username });
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
