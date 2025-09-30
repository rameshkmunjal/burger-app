import ItemModel from '../Schema/itemNew.js';
import shortId from 'shortid';

export const createItem=async(req, res)=>{
    const {prodCode, itemName, category,  minLvl, maxLvl} = req.body;
    console.log("payload inside createItem req body :", prodCode, itemName, category,  minLvl, maxLvl); 
    const id=shortId.generate();
      
    const i = await ItemModel.create({id, prodCode, itemName, category,  minLvl, maxLvl});
    
    

    if (i) {        
        console.log(i);
        res.status(201).json({
            id:i.id,
            prodCode:i.prodCode,
            itemName:i.itemName,
            category:i.category,
            minLvl:i.minLvl,
            maxLvl:i.maxLvl
        })
    } else {
        res.status(400).json({message:"Invalid Item data"});
        throw new Error('Invalid item data')
    }
}


/* PUT API to EDIT item  */
export const editItem=async(req, res)=>{
    const {id, prodCode, itemName, category,  minLvl, maxLvl} = req.body;
    console.log(id, prodCode, itemName, category,  minLvl, maxLvl);    
    

    const i = await ItemModel.findOne({ 'id': req.params.id });
    
  
  console.log(i);
    if (i) {
        i.id=id, 
        i.prodCode=prodCode,
        i.itemName=itemName, 
        i.category=category,
        i.minLvl=minLvl,
        i.maxLvl=maxLvl;

  
        const updatedItem = await i.save();
        console.log("updatedItem....", updatedItem);
        res.json(updatedItem);
    } else {
      res.status(404)
      throw new Error('record not found')
    }
}



/* GET API to get item info list */
export const getItemList=async(req, res)=>{
    const itemList=await ItemModel.find();
    //console.log(itemList);
    if(itemList){
        res.json(itemList);
    } else {
        res.status(404);
        throw new Error('itemList Not Found');
    }
}



/* DELETE API related functions */
export const deleteItem= async (req, res) => {
    const item = await ItemModel.findOne({ id: req.params.id })
  
    if (item) {
      await item.deleteOne()
      res.json({ message: 'clicked item record deleted' })
    } else {
      res.status(404)
      throw new Error('item not found')
    }
}


export const getItemById=async(req, res)=>{
    console.log(req.params.id);
    let item= await ItemModel.findOne({'id':req.params.id}).lean();
  
    if(item){
          res.json(item);
    }else{
          res.status(404);
          throw new Error('purchase item not found');
    }
  
  }