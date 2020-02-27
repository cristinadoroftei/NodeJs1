const app = require("express")(); //the same thing as in the last API project
const request = require("request");

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
    rock: {
      heavyMetal: ["Mettalica", "Iron Maiden"],
      alternative: ["RHCP", "Nirvana"]
    },
    electronic: {
      dnb: ["Noisia", "Pendulum"]
    }
  };
  res.send(music);
});

//it's initialized once: only when you start the server. That's why we don't put it inside the /time method
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

//this callbacks are called when the client is accessing them
app.get("/time", (req, res) => {
  const date = new Date();

  res.send({
    date: date.toLocaleTimeString(),
    hour: date.getHours(),
    weekday: weekdays[date.getDay()],
    anotherweekday: date.toLocaleString("en-us", { weekday: "long" })
  });
});

//when you say return, you jump out of the callback, so the second res.send will not get executed
app.get("/testroute", (req, res) => {
  if (true) {
    return res.send({ message: "Inside the if" });
  }
  return res.send({ message: "Outside the if" });
});

app.get('/user/:id', (req,res) => {
  console.log(req.params)
  return res.send({ id: req.params.id })
})


//http://localhost:3000/search?id=2
app.get("/search", (req, res) => {
  return res.send({
    id: req.query.id
  })
})

app.get("/documentation", (req,res) => {
  console.log(__dirname)
  // return res.redirect("/documentationtwo")
  return res.sendFile(`${__dirname}/public/documentation.html`);
})


app.get("/documentationtwo", (req,res) => {
  console.log(__dirname)
  return res.sendFile(`${__dirname}/public/documentationtwo.html`);
})


app.get("/google", (req,res) => {
  request('http://www.google.com', function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.\
    return res.send(body)
  });
})

app.listen(3000, error => {
  if (error) {
    console.log(error);
  }
  console.log("Server is running on port", 3000);
});
