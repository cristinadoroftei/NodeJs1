const app = require("express")(); //the same thing as in the last API project. () instanciates it

const devices = [{id: 1, name: 'Samsung'}, {id:2, name: 'Apple'}, {id:3, name:'Nokia'}]

app.get("/", (req,res) => {
    return res.send({
        description: "Some API about Devices"
    })
})

//localhost:3000/devices
app.get("/devices", (req,res) => {
    return res.send({devices: devices})
})

//localhost:3000/device/1
app.get("/device/:index", (req, res) => {
    const index = Number(req.params.index);
    const device = devices.find(device => device.id === index)
    return res.send({device: device})
})

//localhost:3000/device?index=1
app.get("/device", (req,res) => {
    const index = Number(req.query.index)
    const device = devices.find(device => device.id === index)
    return res.send({device: device})
})

app.post("/test", (req,res) => {
    console.log("test test test")
    res.send({})
})

const server = app.listen(3000, error => {
    if (error) {
      console.log(error);
    }
    console.log("Server is running on port", server.address().port);
  });

