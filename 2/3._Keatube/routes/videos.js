const router = require("express").Router()
const crypto = require("crypto")


const multer = require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "videos/")
    },
    filename: (req, file, cb) => {
        console.log(file)
        const fileName = crypto.randomBytes(30).toString("hex")
        const extension = file.mimetype.split('/').pop();
        cb(null, fileName + "." + extension);
    }
})
const upload = multer({ storage: storage })


//TODO what data should be inside of each object
const videos = [{
    id: "",
    title: "Ocean Waves",
    description: "Watch the Waves nd enjoy",
    fileName:"4731829a-dd4d-4fc5-90d5-61063df5b46c.mp4",
    category:"Nature",
    tags:["waves", "ocean", "coast"],
    uploadDate: new Date(2020, 3, 26, 08, 43)
}];


router.get("/test", (req, res) => {
    return res.send({message : "Does it work?"})
})

const videosPerPage = 10;

router.get("/videos", (req,res) => {

    //Number of videos per page
    const page = req.query.page ? Number(req.query.page) : 1
    const start = (page-1) * videosPerPage
    const end = start + videosPerPage
    // page1 0,10
    //page2 10,20
    return res.send( { response: videos.slice(start,end)})
})

router.get("/videos-get/:videoId", (req, res) => {
    return res.send({response: videos.find(video => video.fileName === req.params.videoId)})
})

router.post("/videos", upload.single('video'), (req,res)=> {
    console.log(req.body)
    console.log(req.file)

    let errors = []

    let video = {
        fileName : req.file.filename,
        title: req.body.title ? req.body.title: "",
        description: req.body.description || "",
        thumbnail : "", //todo,
        category: req.body.category ? req.body.category : "Unknown",
        tags: req.body.tags.split(/[,\s]\s*/),
        uploadDate: new Date()
    }

    if (video.title.length < 8 || video.title.length > 64) {
        errors.push("Title not between 8 and 64.")
    }

    if (video.description.length > 2048){
        errors.push("The description can't be longer than 2048")
    }

    if (errors.length > 0) {
        return res.send({response: errors})
    } else {
        videos.push(video)
        return res.redirect(`/player/${video.fileName}`)
    }
   
    
})

router.post("/test", (req, res) => {
    console.log(req.body.fullName)
    return res.send({})
})



module.exports = router