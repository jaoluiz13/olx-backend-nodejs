const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');

dotenv.config();

const apiRoutes = require('./src/routes/routes');

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;


const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(fileUpload());

server.use(express.static(__dirname+'/public'));

server.use("/",apiRoutes);

server.listen(process.env.PORT,()=>{
    console.log(`Rodando no endereco :${process.env.BASE}`);
});