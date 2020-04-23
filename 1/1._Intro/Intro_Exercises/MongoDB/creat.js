const mongoClient = require("mongodb").MongoClient

const connectionUrl = " mongodb://127.0.0.1:27017"
const dbName = "animalfarm"

mongoClient.connect(connectionUrl, {useUnifiedTopology: true}, (error, client) => {
    if(error){
        throw "Error connecting to mongodb" + error
    }

    const animalFarm = client.db(dbName)
    const buildings = animalFarm.collection('buildings')

    buildings.insertOne({type: "farmhouse"})
    buildings.insertMany([{type:"chicken house"},{type: "shed"}])
})