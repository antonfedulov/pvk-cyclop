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
  TgrName,
  UnitCode,
  WeaponType,
  TargetNumber,
  TargetDestroyed,
  EngagementAt,
  OperationType,
  MvgMovement,
  MvgLeader
}) {
  return {
    mvgName: Name,
    tgrName: TgrName,
    unitCode: UnitCode,
    weaponType: WeaponType,
    targetNumber: TargetNumber,
    targetDestroyed: TargetDestroyed ? 'Уражена' : 'Не уражена',
    engagementAt: formatDate(EngagementAt),
    operationType: OperationType,
    mvgMovement: MvgMovement || '',
    mvgLeader: MvgLeader
  };
}

function getExcelData({
  order,
  mvgName,
  tgrName,
  unitCode,
  weaponType,
  targetNumber,
  targetDestroyed,
  engagementAt,
  operationType,
  mvgMovement,
  mvgLeader
}) {
  return {
    '№': order,
    'Назва МВГ': mvgName,
    'Назва ТГР': tgrName,
    '№ в/ч': unitCode,
    'Озброєння': weaponType,
    'Номер цілі': targetNumber,
    'Результат': targetDestroyed,
    'Дата та час': engagementAt,
    'Тип застосування': operationType,
    'Переміщення МВГ': mvgMovement,
    'Старший МВГ': mvgLeader
  };
}

export default function CyclopTable() {
  const fetchReports = async (clear) => {
    try {
      const params = {
        Name: selectedMVGs.join(','),
        OperationType: selectedTypes.join(','),
        WeaponType: selectedWeapons.join(',')
      };
      const paramsData = !clear ? { params } : {}
      const response = await axios.get(`https://cyclop.medical-tech.com.ua/api/reports/list`, paramsData);
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
  const [tableData, setTableData] = useState([]);
  const [allMVG, setAllMVG] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const [selectedWeapons, setSelectedWeapons] = useState([]);
  const [allWeapons, setAllWeapons] = useState([]);
  
  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    if(tableData?.length) {
      const mvgNames = [...new Set(tableData.map(item => item.mvgName))];
      const types = [...new Set(tableData.map(item => item.operationType))];
      const weapons = [...new Set(tableData.map(item => item.weaponType))];
      setAllMVG(mvgNames);
      setAllTypes(types);
      setAllWeapons(weapons);
    }
  }, [tableData]);

  const filtrClickHandler = () => {
    fetchReports();
  }

  const clearFilterHandler = () => {
    if (selectedMVGs.length || selectedTypes.length || selectedWeapons.length) {
      setSelectedMVGs([]);
      setSelectedTypes([]);
      setSelectedWeapons([]);
      fetchReports(true);
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
      case name === 'weapon':
        setSelectedWeapons(
          typeof value === 'string' ? value.split(',') : value
        );
        break;
    }
  };

  const headerMap = {
    order: '№',
    mvgName: 'Назва МВГ',
    tgrName: 'Назва ТГР',
    unitCode: '№ в/ч',
    weaponType: 'Озброєння',
    targetNumber: 'Номер цілі',
    targetDestroyed: 'Результат',
    engagementAt: 'Дата та час',
    operationType: 'Розхід боєприпасів',
    mvgMovement: 'Переміщення МВГ',
    mvgLeader: 'Старший МВГ'
  };

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
          <InputLabel id="multiple-weapon-label">Фільтрувати по озброєнню</InputLabel>
          <Select
            multiple
            labelId="multiple-weapon-label"
            name="weapon"
            value={selectedWeapons}
            onChange={handleChange}
            input={<OutlinedInput label="Фільтрувати по типу боєприпасів" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {(allWeapons && allWeapons.length) && allWeapons.map((name) => (
              <MenuItem key={name} value={name} style={getStyles(name, selectedWeapons, theme)}>
                <Checkbox checked={selectedWeapons.indexOf(name) > -1} />
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
