const { validationResult, matchedData } = require("express-validator");
const { default: mongoose } = require("mongoose");
const State = require("../models/StateModel");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

module.exports = {
  signin: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }
    const data = matchedData(req);

    const user = await User.findOne({ email: data.email });
    if (!user) {
      res.json({ error: { email: { msg: "email ou senha errados" } } });
      return;
    }
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      res.json({ error: { email: { msg: "email ou senha errados" } } });
      return;
    }


    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    user.token = token;
    await user.save();
    res.json({token: token, email:data.email});
    
  },
  signup: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
    }
    const data = matchedData(req);

    const user = await User.findOne({ email: data.email });
    if (user) {
      res.json({ error: { email: { msg: "Email já cadastrado no sistema" } } });
      return;
    }
    if (mongoose.Types.ObjectId.isValid(data.state)) {
      const stateItem = await State.findById(data.state);
      if (!stateItem) {
        res.json({ error: { state: { msg: "Estado Inexistente" } } });
        return;
      }
    } else {
      res.json({ error: { state: { msg: "Estado Inexistente" } } });
      return;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    const newUser = new User({
      name: data.name,
      email: data.email,
      password: passwordHash,
      token,
      state: data.state,
    });
    await newUser.save();

    res.json({ success: true, token });
  },
};
