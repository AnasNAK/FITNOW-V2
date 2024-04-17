import Cookies from 'js-cookie';

export const getToken = () => Cookies.get('authToken');

export const isAuthenticated = () => !!getToken();
