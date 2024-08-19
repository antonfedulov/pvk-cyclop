import './Main.scss';
import {TextField, Button, Select, MenuItem} from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';

export default function Main() {
  const initialState = {
    name: '',
    operationType: 0,
    ammoType: '',
    ammoCount: 0,
    remainingAmmoCount: 0,
    responsiblePerson: ''
  };
  const [isDisabled, setDisabled] = useState(true)
  const [formData, setFormData] = useState(initialState);

  const operationTypes = [
    { value: 1, option: 'розхід набоїв' },
    { value: 2, option: 'прихід набоїв' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (!!formData.name && !!formData.operationType && !!formData.ammoType && !!formData.ammoCount && !!formData.remainingAmmoCount && !!formData.responsiblePerson) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmit = async () => {
    const operationType = operationTypes.find(type => type.value === +formData.operationType)?.option;
    const formReqData = new FormData();
    formReqData.append('Name', formData.name);
    formReqData.append('OperationType', operationType);
    formReqData.append('AmmoType', formData.ammoType);
    formReqData.append('AmmoCount', formData.remainingAmmoCount);
    formReqData.append('ResponsiblePerson', formData.responsiblePerson);
  
    const response = await axios.post('http://192.168.136.4/api/reports/create', formReqData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  
    if (response.data && response.data.isCreated) {
      console.log(response);
    }
  };

  return (
    <div className='main-page page'>
      <div className='main-page-form'>
        <TextField
          label="Назва МВГ"
          variant="filled"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
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
          label="Тип набоїв"
          variant="filled"
          name="ammoType"
          value={formData.ammoType}
          onChange={handleChange}
        />
        <TextField
          label="Кількість витрачених набоїв"
          variant="filled"
          name="ammoCount"
          type="number"
          value={formData.ammoCount}
          onChange={handleChange}
        />
        <TextField
          label="Залишок набоїв"
          variant="filled"
          name="remainingAmmoCount"
          type="number"
          value={formData.remainingAmmoCount}
          onChange={handleChange}
        />
        <TextField
          label="Відповідальна особа"
          variant="filled"
          name="responsiblePerson"
          value={formData.responsiblePerson}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isDisabled}>Відправити звіт</Button>
      </div>
      
    </div>
  );
};
