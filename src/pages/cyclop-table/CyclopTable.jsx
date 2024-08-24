import './CyclopTable.scss';
import { useTheme } from '@mui/material/styles';
import {
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  Paper,
  MenuItem,
  Checkbox,
  ListItemText,
  Select,
  FormControl,
  InputLabel,
  Button
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/uk';
import ExportExcel from '../../containers/export-excel/ExportExcel';

moment.locale('uk');

function formatDate(dateString) {
  return moment(dateString).format('DD MMMM YYYY HH:mm');
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function getTableData({
  Name,
  OperationType,
  AmmoType,
  AmmoCount,
  ResponsiblePerson,
  RemainingAmmoCount,
  createdAt
}) {

  return {
    mvgNumber: Name,
    operationType: OperationType,
    ammoType: AmmoType,
    spendedAmmoCount: +AmmoCount,
    remainderAmmo: +RemainingAmmoCount,
    createdDate: formatDate(createdAt),
    responsiblePerson: ResponsiblePerson
  };
}

function getExcelData({
  order,
  mvgNumber,
  operationType,
  ammoType,
  spendedAmmoCount,
  remainderAmmo,
  createdDate,
  responsiblePerson
}) {
  return {
    'номер за порядком': order,
    'номер мвг': mvgNumber,
    'тип операції': operationType,
    'тип набоїв': ammoType,
    'кількість витрачених набоїв': spendedAmmoCount,
    'залишок набоїв': remainderAmmo,
    'дата створення запису': createdDate,
    'відповідальна особа': responsiblePerson
  };
}

export default function CyclopTable() {
  const fetchHeroes = async (clear) => {
    try {
      const params = {
        Name: selectedMVGs.join(','),
        OperationType: selectedTypes.join(','),
        AmmoType: selectedAmmoTypes.join(',')
      };
      const paramsData = !clear ? { params } : {}
      const response = await axios.get(`http://192.168.136.4/api/reports/list`, paramsData);
      if (response?.data) {
        response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        const data = response.data.map(item => getTableData(item));
        const excelData = data.map((item, id) => getExcelData({ order: id + 1, ...item }));
        setTableData(data);
        setExcelData(excelData);
      }
    } catch (error) {
      console.error('Error fetching heroes:', error);
    }
  };

  const theme = useTheme();
  const [selectedMVGs, setSelectedMVGs] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAmmoTypes, setSelectedAmmoTypes] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [allMVG, setAllMVG] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [ammoTypes, setAmmoTypes] = useState([]);
  const [excelData, setExcelData] = useState([]);
  
  useEffect(() => {
    fetchHeroes();
  }, []);

  useEffect(() => {
    if(tableData?.length) {
      const mvgNames = [...new Set(tableData.map(item => item.mvgNumber))];
      const types = [...new Set(tableData.map(item => item.operationType))];
      const ammoTypes = [...new Set(tableData.map(item => item.ammoType))];
      setAllMVG(mvgNames);
      setAllTypes(types);
      setAmmoTypes(ammoTypes);
    }
  }, [tableData]);

  const filtrClickHandler = () => {
    fetchHeroes();
  }

  const clearFilterHandler = () => {
    if (selectedMVGs.length || selectedTypes.length || selectedAmmoTypes.length) {
      setSelectedMVGs([]);
      setSelectedTypes([]);
      setSelectedAmmoTypes([]);
      fetchHeroes(true);
    }
  }

  const handleChange = (event) => {
    const { target: { value, name } } = event;
    
    switch (true) {
      case name === 'mvg':
        setSelectedMVGs(typeof value === 'string' ? value.split(',') : value);
        break;
      case name === 'type':
        setSelectedTypes(typeof value === 'string' ? value.split(',') : value);
        break;
      case name === 'ammotype':
        setSelectedAmmoTypes(typeof value === 'string' ? value.split(',') : value);
        break;
    }
  };

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
      <div className='filter-table-panel'>
        <FormControl className='filter-table-panel-field'>
          <InputLabel id="multiple-mvg-label">Фільтрувати по МВГ</InputLabel>
          <Select
            multiple
            labelId="multiple-mvg-label"
            name="mvg"
            value={selectedMVGs}
            onChange={handleChange}
            input={<OutlinedInput label="Фільтрувати по МВГ" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {(allMVG && allMVG.length) && allMVG.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, selectedMVGs, theme)}>
                <Checkbox checked={selectedMVGs.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className='filter-table-panel-field'>
          <InputLabel id="multiple-type-label">Фільтрувати по операціям</InputLabel>
          <Select
            multiple
            labelId="multiple-type-label"
            name="type"
            value={selectedTypes}
            onChange={handleChange}
            input={<OutlinedInput label="Фільтрувати по операціям" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {(allTypes && allTypes.length) && allTypes.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, selectedTypes, theme)}>
                <Checkbox checked={selectedTypes.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className='filter-table-panel-field'>
          <InputLabel id="multiple-ammotype-label">Фільтрувати по типу боєприпасів</InputLabel>
          <Select
            multiple
            labelId="multiple-ammotype-label"
            name="ammotype"
            value={selectedAmmoTypes}
            onChange={handleChange}
            input={<OutlinedInput label="Фільтрувати по типу боєприпасів" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {(ammoTypes && ammoTypes.length) && ammoTypes.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, selectedAmmoTypes, theme)}>
                <Checkbox checked={selectedAmmoTypes.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className='actions-table-panel'>
        <div className='action-btn'>
          <Button variant="contained" color="primary" className='action-btn-primary' onClick={filtrClickHandler}>
            Фільтрувати
          </Button>
          <Button variant="contained" color="primary" className='action-btn-primary' onClick={clearFilterHandler}>
            Скинути фільтри
          </Button>
        </div>
        <ExportExcel excelData={excelData} fileName={'МВГ_Репорти'} />
      </div>
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
