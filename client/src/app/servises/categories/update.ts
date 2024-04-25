import axios, {AxiosError} from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';
import { NewsPost } from '@prisma/client';

const updateCategory = async (token: string, id: string, formData: NewsPost, callback: () => void) => {
  const requestData = {
    ...formData,
    id,
  };

  try {
    await axios.put(routes.categoriesUpdate(id), requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    message.success('Категория успешно обновлена!');
    callback();
  } catch (err) {
    console.error('Не удалось обновить категорию', err);

    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default updateCategory;
