import PurchaseModel from '../Schema/purchase.js';
import { make5LettersStr } from './CommonFunctions.js';
import shortId from 'shortid';
export const getPurchaseList=async(req, res)=>{
    const list = await PurchaseModel.find().lean();

    if(list){
        res.json(list);
    }else {
        res.status(404);
        throw new Error ("No Data Found");
    }

}

export const getSinglePurchaseDetails=async(req, res)=>{
  console.log(req.params.id);
  let item= await PurchaseModel.findOne({'id':req.params.id}).lean();
  item.day=item.buyDate.getDate();
  item.month=item.buyDate.getMonth()+1;
  item.year=item.buyDate.getFullYear();

  if(item){
        res.json(item);
  }else{
        res.status(404);
        throw new Error('purchase item not found');
  }

}

export const createPurchase=async(req, res)=>{
  
    const {
        date, itemCode, itemName, category, 
        quantity, unitDesc, measType, source,
        amount
      }=req.body;
    //console.log(date);
    const id=shortId.generate();
    const itemId=itemCode+'0'+unitDesc;

    const purchaseItem = new PurchaseModel({
        buyDate:date,
        id: id,
        itemCode:itemCode,  
        itemId: itemId,
        itemName: itemName,
        unitDesc:unitDesc,
        measType:measType,
        category:category,
        quantity: quantity,        
        amount: amount,
        source:source
      });
    
      try {
        const result = await purchaseItem.save();
        //console.log('New Inventory Saved:', result);
        res.json(result);
      } catch (err) {
        //console.error('Error:', err.message);
        throw new Error('Inventory could not be created');
      }
}


export const editPurchase=async(req, res)=>{
  console.log(req.body);
  const {  
          id,
          date, itemCode, itemName, category, 
          quantity, unitDesc, measType, source,
          amount
      } = req.body;
      
      const itemId=itemCode+make5LettersStr(unitDesc);

      const i = await PurchaseModel.findOne({ 'id': req.params.id });
    
  
  console.log(i);
    if (i) {
        i.id=id, 
        i.date=date,
        i.itemId=itemId,
        i.itemCode=itemCode, 
        i.itemName=itemName, 
        i.category=category,        
        i.quantity=quantity,
        i.amount=amount,
        i.measType=measType,   
        i.unitDesc=unitDesc,
        i.source=source;
  
        const updatedPurchase = await i.save();
        //console.log("updatedInventory....", updatedInventory);
        res.json(updatedPurchase);
    } else {
      res.status(404)
      throw new Error('record not found')
    }

}

export const deletePurchase=async(req, res)=>{
  const purchase = await PurchaseModel.findOne({ 'id': req.params.id })
  
  if (purchase) {
    await purchase.deleteOne()
    res.json({ message: 'clicked purchase record deleted' })
  } else {
    res.status(404)
    throw new Error('purchase item not found')
  }

}