const { Model } = require("objection");

class Dog extends Model {
    static tableName = 'dogs';


}

module.exports = Dog