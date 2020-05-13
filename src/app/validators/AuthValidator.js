const Yup = require("yup");

const loginSchema = Yup.object().shape({
  Nome: Yup.string().required(),
  Senha: Yup.string().required(),
});

const registerSchema = Yup.object().shape({
  Nome: Yup.string().required(),
  Senha: Yup.string().required(),
});

module.exports = { loginSchema, registerSchema };
