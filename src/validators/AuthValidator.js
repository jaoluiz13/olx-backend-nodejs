const { checkSchema } = require("express-validator");
const { signin } = require("../controllers/AuthController");

module.exports = {
  signup: checkSchema({
    name: {
      trim: true,
      notEmpty: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "O nome precisa ter pelo menos dois caracteres",
    },
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "Email inválido",
    },
    password: {
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "Sua senha deve ter pelo menos dois caracteres",
    },
    state: {
      notEmpty: true,
      errorMessage: "Estado não preenchido",
    },
  }),
  signin: checkSchema({
    email: {
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "Email inválido",
    },
    password: {
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "Sua senha deve ter pelo menos dois caracteres",
    },
  }),
};
