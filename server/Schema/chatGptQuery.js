/*
This is my inventory Schema.

import mongoose from 'mongoose';
const Schema=mongoose.Schema;
*/
/* to record details of each single release*/
/*
const releaseSchema= new Schema({
    releaseId: { type: String, required: true },
    qty:{type:Number, default:0},
    amt:{type:Number, default:0},
    releasedTo:{type:String, default:''},
    releasedBy:{type:String, default:''},
    releaseDate:{type:Date, default:Date.now}
})

const inventorySchema=new Schema({
    id:{type:String, unique:true}, /* taken from purchase model - common id - to join tables*/
    /*
    balanceQty:{type:Number, default:0},
    releaseQty:{type:Number, default:0},
    balanceAmt:{type:Number, default:0},
    releaseAmt:{type:Number, default:0},
    releases:[releaseSchema]
});

const InventoryModel=mongoose.model('inventory', inventorySchema);
export default InventoryModel;

Now i want to add one more propery to inventorySchema :

status:{type:String, default:'in-stock'}

While releasing stock when balanceQty becomes 0 it should be set to
'out'. Can i add it en-masse to my present inventory records by running 
a script at backend. if yes then please give me script.
*/