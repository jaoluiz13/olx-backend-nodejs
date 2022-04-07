const State = require("../models/StateModel");
const User = require("../models/UserModel");
const Category = require("../models/CategoryModel");
const Ad = require("../models/AdModel");
const { validationResult, matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");

module.exports = {
    getStates: async (req, res) => {
        let states = await State.find();
        res.json({ success: "true", states: states });
    },
    me: async (req, res) => {
        let token = req.query.token;
        const user = await User.findOne({ token });
        const state = await State.findById(user.state);
        const ads = await Ad.find({ idUser: user._id.toString() });
        let adList = [];
        for (let i in ads) {
            const catgry = await Category.findById(ads[i].category);
            adList.push({ ...ads[i], category: catgry.slug });
        }
        res.json({
            name: user.name,
            email: user.email,
            ads: adList,
        });
    },
    editAction: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errors.mapped() });
            return;
        }
        const data = matchedData(req);

        let updates = {};

        if (data.name) {
            updates.name = data.name;
        }
        if (data.email) {
            const emailCheck = await User.findOne({ email: data.email });
            if (emailCheck) {
                res.json({ error: "erro ao atualizar email, email ja existente" });
                return;
            }
            updates.email = data.email;
        }

        if (data.state) {
            if (mongoose.Types.ObjectId.isValid(data.state)) {
                const stateCheck = await State.findById(data.state);
                if (!stateCheck) {
                    res.json({ error: "Estado não existe" });
                    return;
                }
                updates.state = data.state;
            } else {
                res.json({ error: "Estado não existe" });
                return;
            }
        }

        if (data.password) {
            updates.password = await bcrypt.hash(data.password, 10);
        }
    
        await User.findOneAndUpdate({ token: data.token }, { $set: updates });

        res.json({success:"usuario atualizado"});
    },
};
