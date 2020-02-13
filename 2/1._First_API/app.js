const app = require("express")(); //the same thing as in the last API project

app.set("case sensitive routing", true);

app.get("/", (req, res) => {
  res.send({ message: "Hello there" });
});

//define something on the path /aboutMe that returns a JSON representation of you

//call the server with app
//make an http get request with get
app.get("/aboutMe", (req, res) => {
  const me = {
    name: "Cristina",
    hobby: "climbing"
  };
  res.send(me);
});

//define something on the path /aboutThisWebsite
//that returns a JSON representation of the website
app.get("/aboutThisWebsite", (req, res) => {
    const representation = {
      title: "Some noobie website",
      description: "RESTAPI :)"
    };

//   let representation;
//   if (representation) {
    res.send(representation);
//   }
  //res is like a return statement and you should not have any code after it
//   res.send("Sorry no info provided");
});

app.get("/coolMusic", (req, res) => {
    const music = {
        rock : {
            heavyMetal : ["Mettalica", "Iron Maiden"],
            alternative: ["RHCP", "Nirvana"]
        },
        electronic: {
            dnb: ["Noisia", "Pendulum"]
        }
    }
    res.send(music)
})

app.listen(3000, error => {
  if (error) {
    console.log(error);
  }
  console.log("Server is running on port", 3000);
});
