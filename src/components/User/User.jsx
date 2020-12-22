import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { USERNAME } from '../../utils/constants';
import { getCookie } from '../../utils/cookie-handler';
import UserService from '../../services/UserService';
import Loading from '../Loading/Loading';
import './User.scss';

const User = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [profile, setProfile] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: ''
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const { userId } = useParams();
  const history = useHistory();
  const [severity, setSeverity] = useState('success');
  const [notificationMessage, setNotificationMessage] = useState('Profil salvat!');
  const [openNotification, setOpenNotification] = useState(false);
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 2);
  const [from, setFrom] = useState(firstDay.toISOString().split('T')[0]);
  const [to, setTo] = useState(date.toISOString().split('T')[0]);
  const [isProfileError, setIsProfileError] = useState({
    email: false,
    firstName: false,
    lastName: false,
    role: false
  });
  const [isPassError, setIsPassError] = useState({
    password: false,
    confirmPassword: false
  });

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      const profileResponse = await UserService.getUser(userId);
      setIsLoading(false);
      if (profileResponse) {
        setEmail(profileResponse.email);
        setFirstName(profileResponse.firstName);
        setLastName(profileResponse.lastName);
        setRole(profileResponse.role);
        setProfile({
          email: profileResponse.email,
          firstName: profileResponse.firstName,
          lastName: profileResponse.lastName,
          role: profileResponse.role
        });
      }
    };
    getProfile();
  }, []);

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

  const validateInput = (value, field) => {
    let valid = true;
    if (!value) {
      valid = false;
      setIsProfileError((prevValue) => ({
        ...prevValue,
        [field]: true
      }));
    } else {
      setIsProfileError((prevValue) => ({
        ...prevValue,
        [field]: false
      }));
    }
    return valid;
  };

  const handleCancelEditProfile = () => {
    setEdit(false);
    setEmail(profile.email);
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setRole(profile.role);
  };

  const handleSaveProfile = async () => {
    if (
      !validateInput(email, 'email') ||
      !validateInput(firstName, 'firstName') ||
      !validateInput(lastName, 'lastName') ||
      !validateInput(role, 'role')
    ) {
      return;
    }
    setIsLoading(true);
    const saveResponse = await UserService.updateUser(userId, email, firstName, lastName, role);
    setIsLoading(false);
    if (saveResponse) {
      setEmail(saveResponse.email);
      setFirstName(saveResponse.firstName);
      setLastName(saveResponse.lastName);
      setRole(saveResponse.role);
      setProfile({
        email: saveResponse.email,
        firstName: saveResponse.firstName,
        lastName: saveResponse.lastName,
        role: saveResponse.role
      });
      setSeverity('success');
      setNotificationMessage('Profil salvat!');
      setOpenNotification(true);
      setEdit(false);
    } else {
      setSeverity('error');
      setNotificationMessage('Server error!');
      setOpenNotification(true);
    }
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const handleGetTotal = async () => {
    setIsLoading(true);
    const userStatsResponse = await UserService.getUserStats(userId, from, to);
    setIsLoading(false);
    if (userStatsResponse) {
      setTotalQuantity(userStatsResponse.total);
      setShowTotal(true);
    }
  };

  const validateConfirmPassword = () => {
    let valid = true;
    if (confirmPassword !== password) {
      valid = false;
      setIsPassError((prev) => ({
        ...prev,
        confirmPassword: true
      }));
    } else {
      setIsPassError((prev) => ({
        ...prev,
        confirmPassword: false
      }));
    }
    return valid;
  };

  const validatePassword = () => {
    let valid = true;
    if (!password) {
      valid = false;
      setIsPassError((prev) => ({
        ...prev,
        password: true
      }));
    } else {
      setIsPassError((prev) => ({
        ...prev,
        password: false
      }));
    }
    return valid;
  };

  const handleCancelEditPassword = () => {
    setEditPassword(false);
    setPassword('');
    setConfirmPassword('');
  };

  const handleSavePassword = async () => {
    if (!validateInput(password, 'password') || !validateConfirmPassword()) {
      return;
    }
    setIsLoading(true);
    const savePasswordResponse = await UserService.updateUserPass(userId, password);
    setIsLoading(false);
    if (savePasswordResponse) {
      setSeverity('success');
      setNotificationMessage('Parola modificata!');
      setOpenNotification(true);
      handleCancelEditPassword();
    } else {
      setSeverity('error');
      setNotificationMessage('Server error!');
      setOpenNotification(true);
    }
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    const deleteAccountresponse = UserService.deleteUser(userId);
    setIsLoading(false);
    if (deleteAccountresponse) {
      history.push('/users');
    } else {
      setSeverity('error');
      setNotificationMessage('Server error!');
      setOpenNotification(true);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="tkm-oil-user">
        <div className="title">Profil utilizator</div>
        <div className="content">
          <div className="left-col">
            <div className="profile">
              <div className="row">
                <TextField
                  className="email input"
                  id="outline-email-new-user"
                  variant="outlined"
                  label="Username *"
                  type="text"
                  value={email}
                  onChange={handleChangeEmail}
                  onBlur={() => validateInput(email, 'email')}
                  error={isProfileError.email}
                  disabled={!edit || email === getCookie(USERNAME)}
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
                  error={isProfileError.firstName}
                  disabled={!edit}
                />
              </div>
              <div className="row">
                <TextField
                  className="last-name input"
                  id="outline-last-name"
                  variant="outlined"
                  label="Nume *"
                  type="text"
                  value={lastName}
                  onChange={handleChangeLastName}
                  onBlur={() => validateInput(lastName, 'lastName')}
                  error={isProfileError.lastName}
                  disabled={!edit}
                />
                <FormControl variant="outlined" className="role input" error={isProfileError.role} disabled={!edit}>
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
              </div>
              <div className="row">
                {!edit && (
                  <Button className="input button edit-button" variant="contained" onClick={() => setEdit(true)}>
                    Editeaza profil
                  </Button>
                )}
                {edit && (
                  <Button className="input button cancel-button" variant="contained" onClick={handleCancelEditProfile}>
                    Anuleaza
                  </Button>
                )}
                {edit && (
                  <Button className="input button submit-button" variant="contained" onClick={handleSaveProfile}>
                    Salveaza
                  </Button>
                )}
              </div>
            </div>
            <div className="quantity">
              <div className="inputs">
                <TextField
                  className="date input filter"
                  id="outline-date"
                  label="De la"
                  type="date"
                  value={from}
                  onChange={handleFromChange}
                />
                <TextField
                  className="date input filter"
                  id="outline-date"
                  label="Pana la"
                  type="date"
                  value={to}
                  onChange={handleToChange}
                />
              </div>
              <div className="values">
                <Button className="input button calc-button" variant="contained" onClick={handleGetTotal}>
                  Calculeaza
                </Button>
                {showTotal && <div className="total-quantity">{`${totalQuantity}kg`}</div>}
              </div>
            </div>
          </div>
          <div className="right-col">
            <div className="change-password">
              {editPassword && (
                <div className="inputs">
                  <TextField
                    className="password input"
                    id="outline-password-new-user"
                    variant="outlined"
                    label="Parola *"
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                    onBlur={() => validatePassword()}
                    error={isPassError.password}
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
                    error={isPassError.confirmPassword}
                  />
                </div>
              )}
              <div className="password-buttons">
                {!editPassword && (
                  <Button
                    className="input button edit-button"
                    variant="contained"
                    onClick={() => setEditPassword(true)}
                  >
                    Editeaza parola
                  </Button>
                )}
                {editPassword && (
                  <Button className="input button cancel-button" variant="contained" onClick={handleCancelEditPassword}>
                    Anuleaza
                  </Button>
                )}
                {editPassword && (
                  <Button className="input button submit-button" variant="contained" onClick={handleSavePassword}>
                    Salveaza
                  </Button>
                )}
              </div>
            </div>
            <div className="delete-account">
              {deleteAccount && (
                <div className="confirmation-text">Esti sigur ca vrei sa stergi permanent acest utilizator?</div>
              )}
              <div className="buttons">
                {!deleteAccount && (
                  <Button
                    className="input button delete-button"
                    variant="contained"
                    onClick={() => setDeleteAccount(true)}
                  >
                    Sterge utilizator
                  </Button>
                )}
                {deleteAccount && (
                  <Button
                    className="input button cancel-button"
                    variant="contained"
                    onClick={() => setDeleteAccount(false)}
                  >
                    Anuleaza
                  </Button>
                )}
                {deleteAccount && (
                  <Button
                    className="input button confirm-delete-button"
                    variant="contained"
                    onClick={handleDeleteAccount}
                  >
                    Da, Sterge
                  </Button>
                )}
              </div>
            </div>
          </div>
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

export default User;
