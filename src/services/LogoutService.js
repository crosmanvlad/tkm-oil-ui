import { removeCookie } from '../utils/cookie-handler';
import { TOKEN, USERNAME, ROLE } from '../utils/constants';

const logout = () => {
  removeCookie(TOKEN);
  removeCookie(USERNAME);
  removeCookie(ROLE);
  window.location.href = '/#/login';
};

const LogoutService = {
  logout
};

export default LogoutService;
