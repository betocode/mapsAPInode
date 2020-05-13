/* eslint-disable class-methods-use-this */

const service = require("../services/OrderService");
const ResponseObject = require("../models/ResponseObject");
const {
  OrderSchema,
  singleOrderSchema,
} = require("../validators/OrderValidator");

class OrderController {
  async create(req, res) {
    const { IdUsuario } = req;
    const {
      DataEntrega,
      PontoPartidaLat,
      PontoPartidaLong,
      PontoDestinoLat,
      PontoDestinoLong,
      TipoViagem,
    } = req.body;
    const response = new ResponseObject();

    /** ************************************************
    VALIDACAO
    ************************************************** */

    if (!(await OrderSchema.isValid({ ...req, ...req.body }))) {
      response.code = "error";
      response.status = 400;
      response.message = "Missing parameters to create order";
      return res.status(400).json(response);
    }

    /** ************************************************
     CRIANDO RESPOSTA HTTP
    ************************************************** */
    try {
      const data = await service.createOrder({
        DataEntrega,
        PontoPartidaLat,
        PontoPartidaLong,
        PontoDestinoLat,
        PontoDestinoLong,
        IdUsuario,
        TipoViagem,
      });

      response.code = "success";
      response.status = 200;
      response.data = data;

      return res.status(200).json(response);
    } catch (error) {
      response.code = "error";
      response.status = 400;
      response.message = error.toString();
      return res.status(400).json(response);
    }
  }

  async delete(req, res) {
    const { IdUsuario } = req;
    const { IdEntrega } = req.params;
    const response = new ResponseObject();

    /** ************************************************
    VALIDACAO
    ************************************************** */

    if (!(await singleOrderSchema.isValid(req.params))) {
      response.code = "error";
      response.status = 400;
      response.message = "Missing Fields to delete order";
      return res.status(400).json(response);
    }

    /** ************************************************
     CRIANDO RESPOSTA HTTP
    ************************************************** */

    try {
      const data = await service.deleteOrder({ IdEntrega, IdUsuario });

      response.code = "success";
      response.status = 200;
      response.data = data;

      return res.status(200).json(response);
    } catch (error) {
      response.code = "error";
      response.status = 400;
      response.message = error.toString();
      return res.status(400).json(response);
    }
  }

  async listOrders(req, res) {
    const { IdUsuario } = req;
    const response = new ResponseObject();

    /** ************************************************
     CRIANDO RESPOSTA HTTP
    ************************************************** */

    try {
      const data = await service.listOrders({ IdUsuario });
      response.code = "success";
      response.status = 200;
      response.data = data;

      return res.status(200).json(response);
    } catch (error) {
      response.code = "error";
      response.status = 401;
      response.message = error.toString();
      return res.status(401).json(error);
    }
  }
  async singleOrder(req, res) {
    const { IdEntrega } = req.params;
    const response = new ResponseObject();

    /** ************************************************
    VALIDACAO
    ************************************************** */

    if (!(await singleOrderSchema.isValid(req.params))) {
      response.code = "error";
      response.status = 400;
      response.message = "Missing Fields to single order";
      return res.status(400).json(response);
    }

    /** ************************************************
     CRIANDO RESPOSTA HTTP
    ************************************************** */

    try {
      const data = await service.singleOrder({ IdEntrega });
      response.code = "success";
      response.status = 200;
      response.data = data;

      return res.status(200).json(response);
    } catch (error) {
      response.code = "error";
      response.status = 401;
      response.message = error.toString();
      return res.status(401).json(error);
    }
  }
}

module.exports = new OrderController();
