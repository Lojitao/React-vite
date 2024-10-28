// utils/cookie.js
import Cookies from 'js-cookie';


// 設置cookie
export const setCookie = (name, value, options = {}) => {
  Cookies.set(name, value, { expires: 7, ...options }); // 預設過期時間為7天
};

// 獲取cookie
export const getCookie = (name) => {
  return Cookies.get(name);
};

// 刪除cookie
export const removeCookie = (name, options = {}) => {
  Cookies.remove(name, options);
};

// 檢查cookie是否存在
export const checkCookie = (name) => {
  return !!Cookies.get(name);
};

// 獲取所有cookie
export const getAllCookies = () => {
  return Cookies.get();
};
