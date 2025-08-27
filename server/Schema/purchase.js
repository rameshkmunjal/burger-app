import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const purchaseSchema=new Schema({
    buyDate:{type:Date, default:Date.now},
    id:{type:String, unique:true},/* unique id : for record - deletion, edit */ 
    itemCode:{type:String, default:''}, /*  for  a item code i.e.  102 */ 
    itemId:{type:String, default:''}, /*  for  a item info i.e. 10201000 */  
    itemName:{type:String, default:''}, /*  item name with full details i.e. besan */ 
    category:{type:String, default:''}, /*  like grocery, packaging */  
    unitDesc:{type:String, default:''},
    measType:{type:String, default:''},/* like gram, litre */ 
    quantity:{type:Number, default:0}, /*  example 100, 60 etc */     
    amount:{type:Number, default:0},
    source:{type:String, default:''},
    add2stock:{type:Boolean, default:false}
})


const PurchaseModel = mongoose.model('purchase', purchaseSchema);
export default PurchaseModel;