import axios, {AxiosError} from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';

const setMainPromoBanner = async (token: string, id: string) => {
  try {
    const { data } = await axios.put(
      routes.setMain('promo-banners', id),
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    message.success(data.message);
  } catch (err) {
    console.error('Не удалось обновить промо-баннер', err);

    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default setMainPromoBanner;
