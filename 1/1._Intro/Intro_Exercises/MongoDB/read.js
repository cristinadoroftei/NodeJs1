const mongoClient = require("mongodb").MongoClient

//
const connectionUrl = "mongodb://localhost:27017";
const dbName = "animalfarm"

//we are connected to the mongo server 
mongoClient.connect(connectionUrl, { useUnifiedTopology: true}, (error, client) => {
    if(error) {
        throw "Error connecting to mongodb" + error
    }

    const animalFarm = client.db(dbName)
    const buildings = animalFarm.collection('buildings')

    
    buildings.find({type: {$exists: true}}, {projection: {_id: 0}}).limit(1).toArray((error, foundBuildings) => {
        console.log(foundBuildings)
        client.close()
    })
})
