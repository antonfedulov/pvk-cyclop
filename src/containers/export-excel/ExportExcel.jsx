import './ExportExcel.scss';
import {
  Button
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'sheetjs-style';

export default function ExportExcel({ excelData, fileName }) {

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    ws['!cols'] = [
      { wpx: 85 },
      { wpx: 100 },
      { wpx: 175 },
      { wpx: 175 },
      { wpx: 175 },
      { wpx: 175 },
      { wpx: 175 },
      { wpx: 300 }
  ];

  const headerStyle = {
    font: { bold: true },
    border: {
        top: { style: 'thick' },
        bottom: { style: 'thick' },
        left: { style: 'thick' },
        right: { style: 'thick' }
    },
    alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center'
    }
};

  const rowStyle = {
    border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
    },
    alignment: {
        wrapText: true,
        horizontal: 'left',
        vertical: 'center'
    }
  };

      // Застосувати стиль до заголовків (перший рядок)
      const cellRange = XLSX.utils.decode_range(ws['!ref']);
      for (let C = cellRange.s.c; C <= cellRange.e.c; ++C) {
          const headerCellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
          if (!ws[headerCellAddress]) continue;
  
          ws[headerCellAddress].s = headerStyle;
      }
  
      // Застосувати стиль до решти рядків
    for (let R = 1; R <= cellRange.e.r; ++R) {
      for (let C = cellRange.s.c; C <= cellRange.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
          if (!ws[cellAddress]) continue;
          ws[cellAddress].s = rowStyle;
      }
    }
  
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  return (
    <Button variant="contained" color="success" className='excel-btn' endIcon={<AssignmentIcon />} onClick={exportToExcel}>
      Завантажити Excel
    </Button>
  );
};
