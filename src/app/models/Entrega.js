const Sequelize = require("sequelize");

const { Model } = Sequelize;

class Entrega extends Model {
  static init(sequelize) {
    super.init(
      {
        IdEntrega: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        IdUsuario: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          references: "Usuario",
          referencesKey: "IdUsuario",
        },
        DataEntrega: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        PontoPartidaLat: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        PontoPartidaLong: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        PontoDestinoLat: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        PontoDestinoLong: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        TipoViagem: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "Entrega",
        timestamps: false,
      }
    );
    return this;
  }
  static associate(models) {
    this.hasOne(models.Usuario, {
      sourceKey: "IdUsuario",
      foreignKey: "IdUsuario",
      as: "Usuario",
    });
  }
}

module.exports = Entrega;
