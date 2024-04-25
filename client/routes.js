export const baseUrl = 'http://192.168.1.56:8000'; // TODO поменять URL
// export const baseUrl = process.env.API_URL; // TODO поменять URL
export const extUrl = 'https://cryptohost.vercel.app'; // TODO поменять URL

// export const baseUrl = 'http://192.168.1.56:8000';
const apiPath = 'api';

export default {
  // Auth
  adminLogin: () => [baseUrl, apiPath, 'admin', 'login'].join('/'),
  adminRegister: () => [baseUrl, apiPath, 'admin', 'register'].join('/'),
  adminCurrent: () => [baseUrl, apiPath, 'current'].join('/'),

  // News
  news: () => [baseUrl, apiPath, 'news-posts'].join('/'),
  newsSingle: (id) => [baseUrl, apiPath, 'news-posts', id].join('/'),
  newsCreate: () => [baseUrl, apiPath, 'news-posts', 'create'].join('/'),
  newsUpdate: (id) => [baseUrl, apiPath, 'news-posts', 'update', id].join('/'),
  newsRemove: (id) => [baseUrl, apiPath, 'news-posts', 'remove-hard', id].join('/'),
  newsPublic: () => [baseUrl, apiPath, 'news-posts', 'public'].join('/'),

  // Categories
  categories: () => [baseUrl, apiPath, 'news-categories'].join('/'),
  categoriesSingle: (id) => [baseUrl, apiPath, 'news-categories', id].join('/'),
  categoriesCreate: () => [baseUrl, apiPath, 'news-categories', 'create'].join('/'),
  categoriesUpdate: (id) => [baseUrl, apiPath, 'news-categories', 'update', id].join('/'),
  categoriesRemove: (id) => [baseUrl, apiPath, 'news-categories', 'remove-hard', id].join('/'),

  // Promo-banner
  promoBanners: () => [baseUrl, apiPath, 'promo-banners'].join('/'),

  // Activities
  activities: () => [baseUrl, apiPath, 'activities'].join('/'),

  // Common
  upload: (entityName) => [baseUrl, apiPath, 'upload', entityName].join('/'),
};
