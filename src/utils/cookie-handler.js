import { Cookies } from 'react-cookie';

export const removeCookie = (name) => {
  const cookies = new Cookies();
  if (cookies.get(name)) {
    cookies.remove(name, { path: '/' });
    return true;
  }
  return false;
};

export const setCookie = (name, value) => {
  removeCookie(name);
  const cookies = new Cookies();
  cookies.set(name, value, { path: '/' });
};

export const getCookie = (name) => {
  const cookies = new Cookies();
  return cookies.get(name);
};
