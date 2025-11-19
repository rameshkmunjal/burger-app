import mongoose from "../db.js";
const Schema = mongoose.Schema;

const userSchema=new Schema({
    id:{type:String, unique:true},/* unique id : for record - deletion, edit */
    name:{type:String, default:''} ,//sale date - 25012025
    email:{type:String, default:''} , //10000 etc
    password:{type:String, default:''} ,// Big Burly, Chatora Point  etc  
    isAdmin:{type:Boolean, default:false}
})


const UserModel = mongoose.model('user', userSchema, 'users'); // 👈 third arg is actual collection name
export default UserModel;