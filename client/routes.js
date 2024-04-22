//export const baseUrl = 'http://192.168.1.56:8000'; // TODO поменять URL
export const baseUrl = process.env.API_URL; // TODO поменять URL

// export const baseUrl = 'http://192.168.1.56:8000';
const apiPath = 'api';

export default {
  // news: () => [baseUrl, apiPath, ''].join('/'),
  adminLogin: () => [baseUrl, apiPath, 'admin', 'login'].join('/'),
  adminRegister: () => [baseUrl, apiPath, 'admin', 'register'].join('/'),
  adminCurrent: () => [baseUrl, apiPath, 'current'].join('/'),
  categories: () => [baseUrl, apiPath, 'categories'].join('/'),
  news: () => [baseUrl, apiPath, 'news-posts'].join('/'),
  newsPublic: () => [baseUrl, apiPath, 'news-posts/public'].join('/'),
  promoBanners: () => [baseUrl, apiPath, 'promo-banners'].join('/'),
  activities: () => [baseUrl, apiPath, 'activities'].join('/'),
};
