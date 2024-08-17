import './CyclopTable.scss';
import { Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {TableData} from '../../mocks/table-data.mocks';

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}

export default function CyclopTable() {

  const [tableData, setTableData] = useState(TableData);

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const headerMap = {						
    order: 'номер за порядком',
    mvgNumber: 'номер МВГ',
    operationType: 'тип операції',
    ammoType: 'тип набоїв',
    spendedAmmoCount: 'кількість витрачених набоїв',
    remainderAmmo: 'залишок набоїв',
    createdDate: 'дата створення запису',
    responsiblePerson: 'відповідальна особа'
  }

  return (
    <div className='table-page page'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">

          <TableHead>
            <TableRow>
              {headerMap && Object.keys(headerMap).map((item, id) => {
                
                return (
                  <TableCell align="left" key={id}>{headerMap[item]}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData && tableData.map((row, id) => {
              const dataRow = {...row, order: id + 1};
              return (
                <TableRow
                  key={id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {headerMap && Object.keys(headerMap).map((item, index) => {
                    const order = index + 1;
                    return (
                      <TableCell align="left" key={order}>{dataRow[item]}</TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
