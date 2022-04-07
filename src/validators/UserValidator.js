const { checkSchema } = require("express-validator");
const { signin } = require("../controllers/AuthController");

module.exports = {
  editAction: checkSchema({
    token:{
        notEmpty:true,
    },
    name: {
        optional:true,
      trim: true,
      notEmpty: true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "O nome precisa ter pelo menos dois caracteres",
    },
    email: {
        optional:true,
      isEmail: true,
      normalizeEmail: true,
      errorMessage: "Email inválido",
    },
    password: {
        optional:true,
      isLength: {
        options: { min: 2 },
      },
      errorMessage: "Sua senha deve ter pelo menos dois caracteres",
    },
    state: {
      optional:true,
      notEmpty: true,
      errorMessage: "Estado não preenchido",
    },
  })

};
