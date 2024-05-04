// export const baseUrl = 'http://192.168.1.56:8000'; // TODO поменять URL
// export const baseUrl = process.env.SERVER_URL || 'http://95.181.226.159:8000';
export const baseUrl = process.env.SERVER_URL;
export const clientDomain = process.env.CLIENT_DOMAIN;
// export const baseUrl = 'http://192.168.1.56:8000';

// export const baseUrl = process.env.API_URL;

// export const baseUrl = 'http://192.168.1.56:8000';
// export const baseUrl = 'http://95.181.226.159:8000';
export const extUrl = 'https://cryptohost.vercel.app'; // TODO поменять URL

// export const baseUrl = 'http://192.168.1.56:8000';
const apiPath = 'api';

export default {
  // Auth
  adminLogin: () => [baseUrl, apiPath, 'admin', 'login'].join('/'),
  adminRegister: () => [baseUrl, apiPath, 'admin', 'register'].join('/'),
  adminCurrent: () => [baseUrl, apiPath, 'current'].join('/'),

  // CRUD
  getAll: (pathname) => [baseUrl, apiPath, pathname].join('/'),
  getOne: (pathname, id) => [baseUrl, apiPath, pathname, id].join('/'),
  create: (pathname) => [baseUrl, apiPath, pathname, 'create'].join('/'),
  update: (pathname, id) => [baseUrl, apiPath, pathname, 'update', id].join('/'),
  remove: (pathname, id) => [baseUrl, apiPath, pathname, 'remove-hard', id].join('/'),
  getAllPublic: (pathname) => [baseUrl, apiPath, pathname, 'public'].join('/'),

  setMain: (pathname, id) => [baseUrl, apiPath, pathname, 'set-main', id].join('/'),

  // Common
  upload: (entityName) => [baseUrl, apiPath, 'upload', entityName].join('/'),
};
