// utils.js
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


export const exportJobsToExcel = (data, fileName = 'data.xlsx') => {
  // Transform the data

  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Convert the transformed data to a worksheet
  const ws = XLSX.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  // Write the workbook and save to file
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Trigger the file download
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName);
};


