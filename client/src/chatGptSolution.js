// Controller
export const getMonthlyReleaseReport = async (req, res) => {
    const { month, year } = req.params;
    console.log("month and year ", month, year);
  
    try {
      const [invList, purchaseList] = await Promise.all([
        InventoryModel.find().lean(),
        PurchaseModel.find().lean()
      ]);
  
      if (!invList?.length || !purchaseList?.length) {
        return res.status(404).json({ message: "inventory or purchase data could not be fetched" });
      }
  
      const revisedList = invList
             getReleaseMasterData
             (data => mergeReleasedDataWithPurchaseList(data, purchaseList))
             (data => getFilteredData(data, month, year));
  
             res.json(Array.isArray(revisedList) ? revisedList : []);
  
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
        }
  };
  
  // ✅ Flatten release data
  export const getReleaseMasterData = arr =>
    arr.flatMap(item =>
      item.releases.map(r => {
        const date = r.releaseDate;
        return {
          id: item.id,
          day: date.getDate(),
          month: date.toLocaleString("default", { month: "long" }),
          year: date.getFullYear(),
          fy: findFyOfBuyDate(date),
          date: formatDate(date),
          quantity: r.qty,
          amount: r.amt,
          releasedTo: r.releasedTo,
          releasedBy: r.releasedBy
        };
      })
    );
  
  // ✅ Merge release data with purchase list
  export const mergeReleasedDataWithPurchaseList = (releases, purchases) =>
    releases.flatMap(r =>
      purchases
        .filter(p => p.id === r.id)
        .map(p => ({
          ...r,
          category: p.category,
          itemName: p.itemName,
          itemId: p.itemId,
          month: monthsArray.indexOf(r.month) + 1,
          unitDesc: p.unitDesc,
          measType: p.measType
        }))
    );
  
  // ✅ Filter in one go
  export const getFilteredData = (data, m, y) =>
    data.filter(d => d.month === Number(m) && d.year === Number(y));
  