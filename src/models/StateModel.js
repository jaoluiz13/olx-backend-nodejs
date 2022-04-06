const mongoose =  require('mongoose');
mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
    name: String,
});

const modalName = 'State';

if(mongoose.connection && mongoose.connection.models[modalName]){
    module.exports = mongoose.connection.models[modalName];
}else {
    module.exports = mongoose.model(modalName,modelSchema);
}