const express = require('express');
const app = express()

// parse application/x-www-form-urlencoded - this is for forms
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//makes the server able to share pictures and static content
app.use(express.static('public'))
app.use(express.static('player'))

//here: load navbar and console.log it
const fs = require('fs') // file system

const navbarPage = fs.readFileSync("./public/navbar/navbar.html", "utf8")
const footerPage = fs.readFileSync("./public/footer/footer.html", "utf8")
const frontpagePage = fs.readFileSync("./public/frontpage/frontpage.html", "utf8")
const playerPage = fs.readFileSync("./public/player/player.html", "utf8")
const uploadPage = fs.readFileSync("./public/upload/upload.html", "utf-8")

app.get('/', (req, res) => {
    return res.send(navbarPage + frontpagePage + footerPage)
})

//Import routes
const videosRoute = require("./routes/videos")

//Setup routes
app.use(videosRoute)

app.get("/upload", (req,res) => {
    return res.send(navbarPage + uploadPage + footerPage)
})

app.get("/player/:videoid", (req,res) =>{
    return res.send(navbarPage + playerPage + footerPage)
})




const port = process.env.PORT ? process.env.PORT : 4000; //put the PORT value in a variable
const server = app.listen(port, (error) => {
    if(error){
        console.log(error)
    }
    console.log("System running on port", server.address().port )
});
