const { Router } = require("express");
const authMiddleware = require("./app/middlewares/auth");
const AuthController = require("./app/controllers/AuthController");
const OrderController = require("./app/controllers/OrderController");

const routes = new Router();

// Login

routes.post("/register", AuthController.Register);
routes.post("/login", AuthController.Login);

// MIDDLEWARE AUTH
routes.use(authMiddleware);

routes.get("/auth", AuthController.Auth);

// PEDIDOS
routes.post("/order", OrderController.create);
routes.get("/order", OrderController.listOrders);
routes.get("/order/:IdEntrega", OrderController.singleOrder);
routes.delete("/order/:IdEntrega", OrderController.delete);

module.exports = routes;
