const { Model } = require('objection');
const Role = require("./Role")

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static relationMappings = {
        role: {
            relation: Model.BelongsToOneRelation,
            modelClass: Role,
            join: {
                from: 'users.roleId',
                to: 'roles.id'
            }
        }
    }
}

module.exports = User