const Sequelize = require("sequelize");

const databaseConfig = require("../config/database");

const models = require("../app/models");

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

module.exports = new Database();
