import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { setCookie } from '../../utils/cookie-handler';
import { TOKEN, USERNAME, ROLE } from '../../utils/constants';
import LoginService from '../../services/LoginService';
import Loading from '../Loading/Loading';
import UserContext from '../../context/UserContext';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const user = useContext(UserContext);

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const submitLogin = async () => {
    setShowError(false);
    setIsLoading(true);
    const loginResponse = await LoginService.login(email, password);
    setIsLoading(false);
    if (loginResponse) {
      user.updateUserContext(loginResponse.data.email, loginResponse.data.role, loginResponse.accessToken);
      setCookie(TOKEN, loginResponse.accessToken);
      setCookie(USERNAME, loginResponse.data.email);
      setCookie(ROLE, loginResponse.data.role);
      history.push('/overview');
    } else {
      setShowError(true);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="tkm-oil-login-container">
        <div className="input-container">
          <TextField
            className="email input"
            id="outline-email"
            variant="outlined"
            label="Username"
            type="text"
            value={email}
            onChange={handleChangeEmail}
            error={showError}
          />
          <FormControl className="password input" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handleChangePassword}
              error={showError}
              endAdornment={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>
          <Button className="login-button" variant="contained" onClick={submitLogin}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
