import mongoose from "../db.js";
const Schema = mongoose.Schema;

const expenseSchema=new Schema({
    id:{type:String, unique:true},/* unique id : for record - deletion, edit */
    expenseDate:{type:String, default:''} ,//transaction date - 25012025
    paidTo:{type:String, default:''} ,//in purchase - paid to , in sales - received from
    amount:{type:Number, default:0} , //10000 etc
    head:{type:String, default:''} ,
    details:{type:String, default:''} 
})

const ExpenseModel = mongoose.model('expense', expenseSchema);
export default ExpenseModel;