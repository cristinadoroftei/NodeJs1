const express = require('express');
const app = express()

// parse application/x-www-form-urlencoded - this is for forms
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());
app.use(express.static('public'))



app.get("/video/:videoid", (req,res) =>{
    return res.sendFile(`${__dirname}/public/video.html`)
})


const port = process.env.PORT ? process.env.PORT : 3000;
console.log("This is from the environment variables:", process.env.port)
const server = app.listen(process.env.PORT, (error) => {
    if(error){
        console.log(error)
    }
    console.log("System running on port", server.address().port )
});
