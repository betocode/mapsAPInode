/* eslint-disable class-methods-use-this */
const md5 = require("md5");
const Usuario = require("../models/Usuario");

class AuthService {
  async login({ Nome, Senha }) {
    const hashSenha = md5(Senha);
    let user = await Usuario.findOne({
      where: { Nome, Senha: hashSenha },
    });

    if (!user) {
      throw Error("user not found");
    }

    user = JSON.parse(JSON.stringify(user));

    delete user.Senha;

    return user;
  }

  async register({ Senha, Nome }) {
    const userDuplicate = await Usuario.findOne({ where: { Nome } });
    if (userDuplicate) {
      throw Error("user already registered");
    }

    const user = await Usuario.create({
      Senha: md5(Senha),
      Nome,
    });
    return user;
  }

  async auth({ IdUsuario }) {
    const user = await Usuario.findOne({
      where: { IdUsuario },
    });

    if (!user) {
      throw Error("user not found");
    }

    return user;
  }
}

module.exports = new AuthService();
