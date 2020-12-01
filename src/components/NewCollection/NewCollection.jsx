import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Loading from '../Loading/Loading';
import CollectionService from '../../services/CollectionService';
import './NewCollection.scss';

const NewCollection = () => {
  const today = new Date();
  const formatDate = today.toISOString().split('T')[0];
  const [date, setDate] = useState(formatDate);
  const [firm, setFirm] = useState('');
  const [location, setLocation] = useState('');
  const [anexaNum, setAnexaNum] = useState('');
  const [quantity, setQuantity] = useState('');
  const [severity, setSeverity] = useState('success');
  const [notificationMessage, setNotificationMessage] = useState('Colectare adaugata!');
  const [openNotification, setOpenNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    firm: false,
    location: false,
    anexNum: false,
    qunatity: false,
    date: false
  });

  const Alert = (props) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  const handleChangeFirm = (event) => {
    setFirm(event.target.value);
  };

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleChangeAnexaNum = (event) => {
    setAnexaNum(event.target.value);
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const handleChangeDate = (event) => {
    setDate(event.target.value);
  };

  const clearInputs = () => {
    setFirm('');
    setLocation('');
    setAnexaNum('');
    setQuantity('');
  };

  const validateInput = (value, field) => {
    let valid = true;
    if (!value) {
      valid = false;
      setIsError((prevValue) => ({
        ...prevValue,
        [field]: true
      }));
    } else {
      setIsError((prevValue) => ({
        ...prevValue,
        [field]: false
      }));
    }
    return valid;
  };

  const submitCollection = async () => {
    if (
      !validateInput(firm, 'firm') ||
      !validateInput(location, 'location') ||
      !validateInput(anexaNum, 'anexNum') ||
      !validateInput(quantity, 'quantity') ||
      !validateInput(date, 'date')
    ) {
      return;
    }
    setIsLoading(true);
    const addCollectionResponse = await CollectionService.addCollection(firm, location, anexaNum, quantity, date);
    setIsLoading(false);
    if (addCollectionResponse) {
      setSeverity('success');
      setNotificationMessage('Colectare adaugata!');
      setOpenNotification(true);
      clearInputs();
    } else {
      setSeverity('error');
      setNotificationMessage('Server error!');
      setOpenNotification(true);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="tkm-oil-new-collection">
        <div className="title">Adauga o noua colectare</div>
        <div className="form-container">
          <TextField
            className="firm input"
            id="outline-firm"
            variant="outlined"
            label="Firma *"
            type="text"
            value={firm}
            onChange={handleChangeFirm}
            onBlur={() => validateInput(firm, 'firm')}
            error={isError.firm}
          />
          <TextField
            className="location input"
            id="outline-location"
            variant="outlined"
            label="Locatie *"
            type="text"
            value={location}
            onChange={handleChangeLocation}
            onBlur={() => validateInput(location, 'location')}
            error={isError.location}
          />
          <TextField
            className="anex input"
            id="outline-anex"
            variant="outlined"
            label="Numar anexa *"
            type="text"
            value={anexaNum}
            onChange={handleChangeAnexaNum}
            onBlur={() => validateInput(anexaNum, 'anexNum')}
            error={isError.anexNum}
          />
          <TextField
            className="quantity input"
            id="outline-qunatity"
            variant="outlined"
            label="Cantitate *"
            type="number"
            value={quantity}
            onChange={handleChangeQuantity}
            onBlur={() => validateInput(quantity, 'quantity')}
            error={isError.quantity}
          />
          <TextField
            className="date input"
            id="outline-date"
            variant="outlined"
            label="Data *"
            type="date"
            value={date}
            onChange={handleChangeDate}
            onBlur={() => validateInput(date, 'date')}
            error={isError.date}
          />
          <Button className="submit-button" variant="contained" onClick={submitCollection}>
            Adauga
          </Button>
        </div>
      </div>
      <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={severity}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewCollection;
