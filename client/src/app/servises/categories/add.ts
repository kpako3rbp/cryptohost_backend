import axios, {AxiosError} from 'axios';
import { message } from 'antd';
import { NewsPost } from '@prisma/client';
import routes from '../../../../routes';
import {isErrorWithMessage} from "@/shared/lib/is-error-with-message";

const addCategory = async (
  token: string,
  formData: NewsPost,
  callback: () => void
) => {
  try {
    await axios.post(routes.create('news-categories'), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    message.success('Категория успешно добавлена!');
    callback();
  } catch (err) {
    console.error('Не удалось добавить категорию', err);

    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default addCategory;
