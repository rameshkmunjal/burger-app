import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const saleSchema=new Schema({
    id:{type:String, unique:true},/* unique id : for record - deletion, edit */
    saleDate:{type:Date, default:Date.now} ,//sale date - 25012025
    amount:{type:Number, default:0} , //10000 etc
    outlet:{type:String, default:''} ,// Big Burly, Chatora Point  etc  
})

const SaleModel = mongoose.model('sale', saleSchema);
export default SaleModel;