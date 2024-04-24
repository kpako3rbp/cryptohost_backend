export const baseUrl = 'http://192.168.1.56:8000'; // TODO поменять URL
// export const baseUrl = process.env.API_URL; // TODO поменять URL
export const extUrl = 'https://cryptohost.vercel.app'; // TODO поменять URL

// export const baseUrl = 'http://192.168.1.56:8000';
const apiPath = 'api';

export default {
  // news: () => [baseUrl, apiPath, ''].join('/'),
  adminLogin: () => [baseUrl, apiPath, 'admin', 'login'].join('/'),
  adminRegister: () => [baseUrl, apiPath, 'admin', 'register'].join('/'),
  adminCurrent: () => [baseUrl, apiPath, 'current'].join('/'),
  categories: () => [baseUrl, apiPath, 'news-categories'].join('/'),
  news: () => [baseUrl, apiPath, 'news-posts'].join('/'),
  newsSingle: (id) => [baseUrl, apiPath, 'news-posts', id].join('/'),
  newsCreate: () => [baseUrl, apiPath, 'news-posts', 'create'].join('/'),
  newsUpdate: (id) => [baseUrl, apiPath, 'news-posts', 'update', id].join('/'),
  newsRemove: (id) => [baseUrl, apiPath, 'news-posts', 'remove-hard', id].join('/'),
  newsPublic: () => [baseUrl, apiPath, 'news-posts', 'public'].join('/'),
  promoBanners: () => [baseUrl, apiPath, 'promo-banners'].join('/'),
  activities: () => [baseUrl, apiPath, 'activities'].join('/'),
  upload: (entityName) => [baseUrl, apiPath, 'upload', entityName].join('/'),
};
