/* eslint-disable class-methods-use-this */

const Entrega = require("../models/Entrega");

class OrderService {
  async createOrder({
    IdUsuario,
    DataEntrega,
    PontoPartidaLat,
    PontoDestinoLat,
    PontoPartidaLong,
    PontoDestinoLong,
    TipoViagem,
  }) {
    await Entrega.create({
      IdUsuario,
      DataEntrega,
      PontoPartidaLat,
      PontoPartidaLong,
      PontoDestinoLat,
      PontoDestinoLong,
      TipoViagem,
    });
    const allOrders = await this.listOrders({ IdUsuario });

    return allOrders;
  }

  async deleteOrder({ IdEntrega, IdUsuario }) {
    await Entrega.destroy({ where: { IdEntrega } });
    const allOrders = await this.listOrders({ IdUsuario });
    return allOrders;
  }

  async listOrders({ IdUsuario }) {
    try {
      const allOrders = await Entrega.findAll({
        where: { IdUsuario },
        include: [{ association: "Usuario", attributes: { exclude: "Senha" } }],
      });

      return allOrders;
    } catch (error) {
      console.log(error);
    }
  }

  async singleOrder({ IdEntrega }) {
    const order = await Entrega.findOne({ where: { IdEntrega } });
    return order;
  }
}

module.exports = new OrderService();
