const route = require("express").Router();
const User = require("../models/User");
const Role = require("../models/Role");

const bcrypt = require("bcrypt");
const saltRounds = 12;

route.get("/login", (req, res) => {
  const error = req.query.error;
  res.render("auth/login", {
    pageTitle: "Login",
    error: error ? error : "noError",
    userSession: "noSession",
    isAdmin: false,
  });
});

route.post("/login", async (req, res) => {
  //1. retrieve the login details and validate
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    //2. check for a user match in database
    const findUser = await User.query()
      .where({ username: username })
      .then((user) => {
        //if user not found in the database, return error 400
        if (!user) {
          return res.status(400).redirect("/login?error=User not found");
        } else {
          //3. bcrypt compare
          bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) {
              return res.redirect(
                "/login?error=Something went wrong with the database, please try again"
              );
            }
            console.log("result:" + result);
            if (result) {
              //4. sessions
              req.session.value = username;
              const userType = Role.query()
                .where({ id: user[0].roleId })
                .then((role) => {
                  if (role[0].role === "ADMIN") {
                    req.session.isAdmin = true;
                  } else {
                    req.session.isAdmin = false;
                  }
                }).then(() => {
                  return res.redirect("/");
                })

            } else {
              return res.redirect(
                "/login?error=Invalid username and/or password"
              );
            }
          });
        }
      })
    .catch(err => {
      return res.redirect(
        "/login?error=Invalid username and/or password"
      );
    })
  } else {
    return res.redirect("/login?error=Missing fields");
  }
});

route.get("/signup", (req, res) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    error: "noError",
    userSession: "noSession",
    isAdmin: false,
  });
});

route.post("/signup", async (req, res) => {
  // const users = await User.query().select()
  const username = req.body.username;
  const password = req.body.password;
  const passwordRepeat = req.body.passwordRepeat;
  const email = req.body.email;

  const isPasswordTheSame = password === passwordRepeat;

  if (username && password && isPasswordTheSame && email) {
    if (password.length < 8) {
      return res.status(400).render("auth/signup", {
        userSession: "noSession",
        error: "Password does not fulfill the requirements",
        pageTitle: "Signup",
      });
    } else {
      try {
        const userFound = await User.query()
          .where({ username: username })
          .limit(1);
        if (userFound.length > 0) {
          return res.render("auth/signup", {
            userSession: "noSession",
            error: "Username already exists",
            pageTitle: "Signup",
          });
        } else {
          const defaultUserRole = await Role.query()
            .select()
            .where({ role: "USER" });

          const hashedPassword = await bcrypt.hash(password, saltRounds);

          const newUser = await User.query().insert({
            username: username,
            email: email,
            password: hashedPassword,
            role_id: defaultUserRole[0].id,
          });

          req.session.value = username;
          req.session.isAdmin = false;
          return res.redirect("/");
        }
      } catch (error) {
        console.log(error)
        return res.render("auth/signup", {
          userSession: "noSession",
          error: "Something went wrong with the database",
          pageTitle: "Signup",
        });
      }
    }
  } else if (password && passwordRepeat && !isPasswordTheSame) {
    return res.render("auth/signup", {
      userSession: "noSession",
      error: "Password not matching. Fileds: password and passwordRepeat",
      pageTitle: "Signup",
    });

  } else {

    return res.render("auth/signup", {
      userSession: "noSession",
      error: "Missing fields: username, email, password, passwordRepeat",
      pageTitle: "Signup",
    });
  }
});

route.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.send({ response: error });
    }
    return res.redirect("/");
  });
});

module.exports = route;
