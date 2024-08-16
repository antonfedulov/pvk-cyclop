import './Main.scss';
import {TextField, Button, Select, MenuItem} from '@mui/material';
import React, { useState, useEffect } from 'react';

// import { useNavigate, useLocation } from 'react-router-dom';

export default function Main() {

  const [formData, setFormData] = useState({
    name: '',
    operationType: 1,
    ammoType: '',
    ammoCount: NaN,
    remainingAmmoCount: NaN
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          <MenuItem value={1}>розхід набоїв</MenuItem>
          <MenuItem value={2}>прихід набоїв</MenuItem>
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
        <Button variant="contained" color="primary">Відправити звіт</Button>
      </div>
      
    </div>
  );
};
