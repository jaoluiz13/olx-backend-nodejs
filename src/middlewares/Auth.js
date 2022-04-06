const User = require("../models/UserModel");

module.exports = {
  private: async (req, res, next) => {
    if (!req.query.token && req.body.token) {
      res.status(401).json({ error: "not allowed" });
    }

    let token = "";

    if (req.query.token) {
      token = req.query.token;
    }
    if (req.body.token) {
      token = req.body.token;
    }

    const user = await User.findOne({ token });

    if (!user) {
      res.status(401).json({ error: "not allowed" });
      return;
    }
    next();
  },
};
