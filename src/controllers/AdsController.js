const Category = require('../models/CategoryModel');

module.exports = {
    ad:async(req,res)=>{

    },
    getList:async(req,res)=>{

    },
    getItem:async(req,res)=>{

    },
    getItem:async(req,res)=>{

    },
    editAction:async(req,res)=>{

    },
    categories:async(req,res)=>{
        const cats = await Category.find();

        let categories  = [];

        for (let i in cats){
            categories.push({
                ...cats[i]._doc,
                img:`${process.env.BASE}/assets/images/${cats[i].slug}.png`
            })
        }

        res.json({categories});
    },
};