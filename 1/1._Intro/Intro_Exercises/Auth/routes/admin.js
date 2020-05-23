const router = require("express").Router();
const Dog = require("../models/Dog.js");
const Role = require("../models/Role.js");
const User = require("../models/User.js");

const nodemailer = require("nodemailer");

router.get("/addDog", (req, res) => {
  const sessionValue = req.session.value;
  const sessionIsAdmin = req.session.isAdmin;
  if (!sessionValue) {
    return res.redirect("/login");
  }

  if (sessionValue && sessionIsAdmin === false) {
    return res.render("errors/accessError", {
      pageTitle: "Error",
      userSession: sessionValue,
      isAdmin: false,
    });
  } else if (sessionValue && sessionIsAdmin === true) {
    return res.render("admin/add-dog", {
      pageTitle: "Add dog",
      userSession: sessionValue,
      isAdmin: sessionIsAdmin,
      error: "noError",
    });
  }
});

router.post("/addDog", async (req, res) => {
  const sessionValue = req.session.value;
  const breed = req.body.breed;
  const description = req.body.description;
  const imageUrl = req.body.imageUrl;
  if (breed && description && imageUrl) {
    const addDog = await Dog.query().insert({
      breed: breed,
      description: description,
      imageUrl: imageUrl,
    });
    return res.redirect("/dogs");
  }
  if (!breed || !description || !imageUrl) {
    return res.render("add-dog", {
      pageTitle: "Add dog",
      userSession: sessionValue,
      isAdmin: true,
      error: "Missing fields: Breed, Description, ImageUrl",
    });
  }
});

router.post("/deleteDog/:id", (req, res) => {
    const dogId = req.params.id;
    Dog.query().deleteById(dogId)
    .then(result => {
        return res.redirect("/dogs")
    })
    .catch(error => {
        return res.redirect("/dogs")
    })
})

router.get("/sendEmail", (req, res) => {
  const sessionValue = req.session.value;
  const sessionIsAdmin = req.session.isAdmin;
  if (!sessionValue) {
    return res.redirect("/login");
  }

  if (sessionValue && sessionIsAdmin === false) {
    return res.render("errors/accessError", {
      pageTitle: "Error",
      userSession: sessionValue,
      isAdmin: false,
    });
  } else if (sessionValue && sessionIsAdmin === true) {
    return res.render("admin/send-email", {
      pageTitle: "Send email",
      userSession: sessionValue,
      isAdmin: sessionIsAdmin,
      error: "noError",
    });
  }
});

router.post("/sendEmail", async (req, res) => {
    const subject = req.body.subject;
    const content = req.body.content;

    if(subject && content) {
  let testAccount = await User.query()
  .where({
    email: "favoritedogs1234@gmail.com",
  })

  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: testAccount[0].email, 
      pass: testAccount[0].emailPassword, 
    },
  });

  const userRoleId = await Role.query()
  .where({ role: "USER" })

  let usersList = await User.query()
  .where({ roleId: userRoleId[0].id })

  usersList.forEach((user) => {
    console.log(user.email)
  // send mail with defined transport object
  let info = transporter.sendMail({
    from: testAccount[0].email, // sender address
    to: user.email, // receiver
    subject: subject, // Subject line
    html: `<b>${content}</b>`, // html body
  });
});
return res.redirect("/dogs")
    } else {
        return res.render("admin/send-email", {
            pageTitle: "Send email",
            userSession: sessionValue,
            isAdmin: sessionIsAdmin,
            error: "Missing fields: Subject, Content",
          });
    }


})


module.exports = router;
