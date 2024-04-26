import axios, {AxiosError} from 'axios';
import { message } from 'antd';
import { NewsPost } from '@prisma/client';
import routes from "../../../../routes";

const addActivity = async (token: string, formData: NewsPost, callback: () => void) => {
  try {
    await axios.post(routes.create('crypto-activities'), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    message.success('Активность успешно добавлена!');
    callback();
  } catch (err) {
    console.error('Не удалось добавить активность', err);

    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default addActivity;
