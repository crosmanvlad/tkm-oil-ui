import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Loading from '../Loading/Loading';
import UserService from '../../services/UserService';
import './NewUser.scss';

const NewCollection = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [severity, setSeverity] = useState('success');
  const [role, setRole] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('Utilizator adaugat!');
  const [openNotification, setOpenNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    email: false,
    firstName: false,
    lastName: false,
    role: false,
    password: false,
    confirmPassword: false
  });

  const Alert = (props) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const clearInputs = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
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

  const validateConfirmPassword = () => {
    let valid = true;
    if (confirmPassword !== password) {
      valid = false;
      setIsError((prev) => ({
        ...prev,
        confirmPassword: true
      }));
    } else {
      setIsError((prev) => ({
        ...prev,
        confirmPassword: false
      }));
    }
    return valid;
  };

  const submitUser = async () => {
    if (
      !validateInput(email, 'email') ||
      !validateInput(firstName, 'firstName') ||
      !validateInput(lastName, 'lastName') ||
      !validateInput(role, 'role') ||
      !validateInput(password, 'password') ||
      !validateConfirmPassword()
    ) {
      return;
    }
    setIsLoading(true);
    const addUserResponse = await UserService.createUser(email, password, firstName, lastName, role);
    setIsLoading(false);
    if (addUserResponse) {
      setSeverity('success');
      setNotificationMessage('User adaugat!');
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
      <div className="tkm-oil-new-user">
        <div className="title">Adauga un utilizator nou</div>
        <div className="form-container">
          <TextField
            className="email input"
            id="outline-email-new-user"
            variant="outlined"
            label="Username *"
            type="text"
            value={email}
            onChange={handleChangeEmail}
            onBlur={() => validateInput(email, 'email')}
            error={isError.email}
          />
          <TextField
            className="first-name input"
            id="outline-first-name"
            variant="outlined"
            label="Prenume *"
            type="text"
            value={firstName}
            onChange={handleChangeFirstName}
            onBlur={() => validateInput(firstName, 'firstName')}
            error={isError.firstName}
          />
          <TextField
            className="last-name input"
            id="outline-last-name"
            variant="outlined"
            label="Nume *"
            type="text"
            value={lastName}
            onChange={handleChangeLastName}
            onBlur={() => validateInput(lastName, 'lastName')}
            error={isError.lastName}
          />
          <FormControl variant="outlined" className="role input" error={isError.role}>
            <InputLabel className="background-label" id="select-role-label">
              Rol&nbsp;*
            </InputLabel>
            <Select
              labelId="select-role-label"
              id="select-role"
              value={role}
              onChange={handleChangeRole}
              onBlur={() => validateInput(role, 'role')}
            >
              <MenuItem value="basic">Basic</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className="password input"
            id="outline-password-new-user"
            variant="outlined"
            label="Parola *"
            type="password"
            value={password}
            onChange={handleChangePassword}
            onBlur={() => validateInput(password, 'password')}
            error={isError.password}
          />
          <TextField
            className="confirm-password input"
            id="outline-confirm-password"
            variant="outlined"
            label="Confirma Parola *"
            type="password"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            onBlur={() => validateConfirmPassword()}
            error={isError.confirmPassword}
          />
          <Button className="submit-button" variant="contained" onClick={submitUser}>
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
