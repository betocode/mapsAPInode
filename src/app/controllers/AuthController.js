/* eslint-disable class-methods-use-this */
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const authConfig = require("../../config/auth");
const service = require("../services/AuthService");
const ResponseObject = require("../models/ResponseObject");
const { loginSchema, registerSchema } = require("../validators/AuthValidator");

class AuthController {
  async Login(req, res) {
    const { Nome, Senha } = req.body;
    const response = new ResponseObject();

    /** ************************************************
    VALIDACAO
    ************************************************** */

    if (!(await loginSchema.isValid(req.body))) {
      response.code = "error";
      response.status = 400;
      response.message = "Missing Email or Password";
      return res.status(400).json(response);
    }

    /** ************************************************
     CRIANDO RESPOSTA HTTP
    ************************************************** */
    try {
      const data = await service.login({ Nome, Senha });

      data.token = jwt.sign(data, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
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

  async Register(req, res) {
    const { Senha, Nome } = req.body;
    const response = new ResponseObject();

    /** ************************************************
    VALIDACAO
    ************************************************** */

    if (!(await registerSchema.isValid(req.body))) {
      response.code = "error";
      response.status = 400;
      response.message = "Missing Fields";
      return res.status(400).json(response);
    }

    /** ************************************************
     CRIANDO RESPOSTA HTTP
    ************************************************** */

    try {
      const data = await service.register({
        Senha,
        Nome,
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

  async Auth(req, res) {
    const { IdUsuario } = req;
    const response = new ResponseObject();

    try {
      const data = await service.auth({ IdUsuario });
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

module.exports = new AuthController();
