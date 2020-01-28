const db = require("../data/db-config.js");

module.exports = {
    get,
    getBy,
    getById,
    insert
}

function get () {
    return db("users")
        .select("id", "username");
}

function getBy(filter) {
    return db("users")
      .select("id", "username")
      .where(filter);
  }

function getById(id) {
    return db("users")
        .select("id", "username")
        .where({id})
        .first();
}

function insert(user){
    return db("users")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return getById(id)
        })
}
