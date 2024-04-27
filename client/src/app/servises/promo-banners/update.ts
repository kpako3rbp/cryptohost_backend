import axios, {AxiosError} from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';
import {NewsPost, PromoBanner} from '@prisma/client';

const updatePromoBanner = async (token: string, id: string, formData: PromoBanner, callback: () => void) => {
  const requestData = {
    ...formData,
    id,
  };

  try {
    await axios.put(routes.update('promo-banners', id), requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    message.success('Промо-баннер успешно обновлен!');
    callback();
  } catch (err) {
    console.error('Не удалось обновить промо-баннер', err);

    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default updatePromoBanner;
