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


const port = process.env.PORT ? process.env.PORT : 4000; //put the PORT value in a variable
const server = app.listen(port, (error) => {
    if(error){
        console.log(error)
    }
    console.log("System running on port", server.address().port )
});
