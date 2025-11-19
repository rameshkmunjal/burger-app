import mongoose from "../db.js";
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  id: { type: String, unique: true },
  prodCode: { type: String,  required: true },
  itemCode:{ type: String, default: '' },
  itemName: { type: String, default: '' },
  category: { type: String, default: '' },
  measType:{type:String, default:''},
  minLvl: { type: Number, default: 0 },
  maxLvl: { type: Number, default: 0 }
});

const ItemModel = mongoose.model('iytem', itemSchema);
export default ItemModel;
