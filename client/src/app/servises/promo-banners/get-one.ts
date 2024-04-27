import axios, {AxiosError} from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';

const fetchPromoBanner = async (token: string, id: string) => {
  // console.log('routes.newsSingle(id)', routes.newsSingle(id))
  try {
    const { data } = await axios.get(routes.getOne('promo-banners', id),  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.error('Не удалось получить промо-баннер', err);
    // message.error('Не удалось получить пост');
    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default fetchPromoBanner;
