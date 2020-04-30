const route = require("express").Router();
const User = require("../models/User");

route.post("/login", (req, res) => {
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
            const newUser = await User.query().insert({
                username: username,
                password: password,
                role_id: 2 
              });
            
            //   const role = await Role.query()
            //   .where({ role: 'USER' })
            //   .limit(1);
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
  return res.send({ response: "okok" });
});

module.exports = route;
