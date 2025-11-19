import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportToExcel = (data, fileName = "data") => {

    const formattedData = data.map(({ _id, __v, id,  ...rest }) => {
      const newItem = { ...rest };
  
      // Convert ONLY known date fields
      const dateFields = ["saleDate"]; 
  
      dateFields.forEach(field => {
        if (newItem[field]) {
          const d = new Date(newItem[field]);
          if (!isNaN(d)) {
            newItem[field] = d.toLocaleDateString("en-GB");
          }
        }
      });
  
      return newItem;
    });
  
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
  
    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  
    saveAs(file, `${fileName}.xlsx`);
  };
  