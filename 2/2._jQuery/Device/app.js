const express = require("express");
const app = express();

// parse application/x-www-form-urlencoded - this is for forms
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

let devices = [
  { id: 1, name: "Samsung" },
  { id: 2, name: "Apple" },
  { id: 3, name: "Nokia" }
];

app.get("/", (req, res) => {
  return res.send({
    description: "Some API about Devices"
  });
});

//localhost:3000/devices
app.get("/devices", (req, res) => {
  console.log('dddd')
  return res.send({ response: devices });
});

//localhost:3000/device/1
app.get("/device/:index", (req, res) => {
  const index = Number(req.params.index);
  const device = devices.find(device => device.id === index);
  return res.send({ response: device });
});

//localhost:3000/device?index=1
app.get("/device", (req, res) => {
  const index = Number(req.query.index);
  const device = devices.find(device => device.id === index);
  return res.send({ response: device });
});

let lastElementId = devices[devices.length - 1].id;

app.post("/devices", (req, res) => {
  const newDevice = req.body; //json type
  if (newDevice.name) {
    devices.push({ id: ++lastElementId, name: newDevice.name });
    return res.send(devices);
  }
  return res.status(400).send({ response: "Invalid input" });
});

app.put("/devices", (req, res) => {
  const id = Number(req.query.id);
  const newName = req.body.name;
  if (id) {
    if (newName) {
      const device = devices.find(device => device.id === id);
      device.name = newName;
      return res.send(device);
    }
    return res.status(400).send({ response: "Invalid input" });
  }
  return res.status(404).send({ response: "Device not found" });
});

app.put("/devicesRadu/:id", (req, res) => {
  const deviceIndex = devices.findIndex(
    device => device.id === Number(req.params.id)
  );

  let editedDevice = {
    ...devices[deviceIndex],
    ...({ name } = req.body)
  };

  devices[deviceIndex] = editedDevice;
  res.send({ response: editedDevice });
});

app.put("/devicesAnders/:id", (req, res) => {
  const foundIndex = devices.findIndex(
    device => device.id === Number(req.params.id)
  );
  delete req.body.id; // you don't want to modify the id
  const newDevice = { ...devices[foundIndex], ...req.body };
  devices[foundIndex] = newDevice;
  return res.send({ response: newDevice });
});

app.delete("/devices", (req, res) => {
  // devices = devices.filter(device => device.id !== Number(req.query.id))
  const id = Number(req.query.id);
  if (id) {
    console.log(devices);
    const index = devices.findIndex(device => device.id === id);
    devices.splice(index, 1);
    console.log("After deleting:", devices);
    return res.send({});
  }
  return res.status(404).send({ response: "Device not found" });
});

const server = app.listen(3000, error => {
  if (error) {
    console.log(error);
  }
  console.log("Server is running on port", server.address().port);
});
