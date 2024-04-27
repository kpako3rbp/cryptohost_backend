import axios, {AxiosError} from 'axios';
import { message } from 'antd';
import {NewsPost, PromoBanner} from '@prisma/client';
import routes from "../../../../routes";

const addPromoBanner = async (token: string, formData: PromoBanner, callback: () => void) => {
  try {
    await axios.post(routes.create('promo-banners'), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    message.success('Промо-баннер успешно добавлен!');
    callback();
  } catch (err) {
    console.error('Не удалось добавить промо-баннер', err);

    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default addPromoBanner;
