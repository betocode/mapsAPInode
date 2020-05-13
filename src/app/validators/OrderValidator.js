const Yup = require("yup");

const OrderSchema = Yup.object().shape({
  DataEntrega: Yup.date().required(),
  PontoPartidaLat: Yup.string().required(),
  PontoPartidaLong: Yup.string().required(),
  PontoDestinoLat: Yup.string().required(),
  PontoDestinoLong: Yup.string().required(),
  IdUsuario: Yup.number().required(),
});

const singleOrderSchema = Yup.object().shape({
  IdEntrega: Yup.number().required(),
});

module.exports = { OrderSchema, singleOrderSchema };
