const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    idUSer:String,
    state:String,
    category:String,
    images:[Object],
    dateCreated:Date,
    title:String,
    price:Number,
    priceNegotiable:Boolean,
    description:String,
    views:Number,
    status:String

});

const modalName = 'Ad';

if(mongoose.connection && mongoose.connection.models[modalName]){
    module.exports = mongoose.connection.models[modalName];
}else {
    module.exports = mongoose.model(modalName,modelSchema);
}