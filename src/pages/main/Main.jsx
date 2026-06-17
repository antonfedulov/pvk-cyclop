import './Main.scss';
import { TextField, Button, Select, MenuItem, Snackbar, Switch, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';

export default function Main() {
  dayjs.locale('uk');

  const initialState = {
    name: '',
    unitCode: '',
    weaponType: '',
    targetNumber: '',
    targetDestroyed: false,
    engagementAt: '',
    operationType: 1,
    mvgMovement: '',
    mvgLeader: ''
  };

  const [isDisabled, setDisabled] = useState(true)
  const [formData, setFormData] = useState(initialState);
  const [engagementAt, setEngagementAt] = useState(dayjs());

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleSnackBarState = () => {
    const newState = { vertical: 'bottom', horizontal: 'center' };
    setState({ ...newState, open: true });
  };

  const handleCloseSnackBar = () => {
    setState({ ...state, open: false });
  };

  const operationTypes = [
    { value: 1, option: 'розхід боєприпасів' }
  ]

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    let currentValue = name === 'targetDestroyed' ? checked : value

    setFormData({ ...formData, [name]: currentValue });

    if (
          !!formData.name
      &&  !!formData.weaponType
      &&  !!formData.targetNumber
      &&  !!formData.unitCode
      &&  !!formData.mvgLeader
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = async () => {
    const operationType = operationTypes.find(type => type.value === +formData.operationType)?.option;
    const formReqData = new FormData();

    formReqData.append('Name', formData.name);
    formReqData.append('UnitCode', formData.unitCode);
    formReqData.append('WeaponType', formData.weaponType);
    formReqData.append('TargetNumber', formData.targetNumber);
    formReqData.append('TargetDestroyed', formData.targetDestroyed);
    formReqData.append('EngagementAt', engagementAt);
    formReqData.append('OperationType', operationType);
    formReqData.append('MvgMovement', formData.mvgMovement);
    formReqData.append('MvgLeader', formData.mvgLeader);
  
    const response = await axios.post('https://cyclop.medical-tech.com.ua/api/reports/create', formReqData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  
    if (response.data && response.data.isCreated) {
      handleSnackBarState({ vertical: 'bottom', horizontal: 'center' });
      setDisabled(true);
      setFormData(initialState);
    }
  };

  return (
    <>
    <div className='main-page page'>
      <div className='main-page-form'>
        <TextField
          label="Назва МВГ"
          variant="filled"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="№ в/ч"
          variant="filled"
          name="unitCode"
          value={formData.unitCode}
          onChange={handleChange}
        />
        <TextField
          label="Озброєння"
          variant="filled"
          name="weaponType"
          value={formData.weaponType}
          onChange={handleChange}
        />
        <TextField
          label="Номер цілі"
          variant="filled"
          name="targetNumber"
          value={formData.targetNumber}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Switch
              checked={!!formData.targetNumber && formData.targetDestroyed}
              name="targetDestroyed"
              onChange={handleChange}
            />
          }
          disabled={!formData.targetNumber}
          label={!!formData.targetNumber && formData.targetDestroyed ? 'Уражена' : 'Не уражена'}
        />
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="uk"
        >
          <DateTimePicker
            label="Дата та час застосування"
            value={engagementAt}
            onChange={(value) => setEngagementAt(value)}
            ampm={false}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'filled',
              },
            }}
          />
        </LocalizationProvider>
        <Select
          label="Тип операції"
          name="operationType"
          value={formData.operationType}
          onChange={handleChange}
        >
          {
            operationTypes.length && operationTypes.map(type => (<MenuItem key={type.value} value={type.value}>{type.option}</MenuItem>))
          }
        </Select>
        <TextField
          label="Переміщення МВГ"
          variant="filled"
          name="mvgMovement"
          value={formData.mvgMovement}
          onChange={handleChange}
        />
        <TextField
          label="Старший МВГ"
          variant="filled"
          name="mvgLeader"
          value={formData.mvgLeader}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isDisabled}>Відправити звіт</Button>
      </div>
    </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseSnackBar}
        message="Звіт додано до бази даних"
        key={vertical + horizontal}
      />
    </>
  );
};
