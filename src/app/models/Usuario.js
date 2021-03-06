const Sequelize = require("sequelize");
const md5 = require("md5");

const { Model } = Sequelize;

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        IdUsuario: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        Nome: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        Senha: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
      },
      { sequelize, tableName: "Usuario", timestamps: false }
    );

    return this;
  }

  checkPassword(password) {
    return md5(password) === this.Senha;
  }
}

module.exports = Usuario;
