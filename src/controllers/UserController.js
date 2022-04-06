const State = require('../models/StateModel');


module.exports = {
    getStates:async(req,res)=>{
        let states = await State.find();
        res.json({"success":"true","states":states});
    },
    me:async(req,res)=>{

    },
    editAction:async(req,res)=>{

    },
};