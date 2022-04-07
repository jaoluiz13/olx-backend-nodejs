const User = require("../models/UserModel");

module.exports = {
  private: async (req, res, next) => {
    if (!req.query.token && !req.body.token) {
      res.status(401).json({ error: "not allowed" });
    }

    let tokenUser = "";

    if (req.query.token) {
      tokenUser = req.query.token;
    }
    if (req.body.token) {
      tokenUser = req.body.token;
    }

    const user = await User.findOne({ tokenUser });
    if (!user) {
      res.status(401).json({ error: "Erro de token" });
      return;
    }
    next();
  },
};
