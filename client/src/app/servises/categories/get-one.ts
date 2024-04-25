import axios, {AxiosError} from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';

const fetchCategory = async (token: string, id: string) => {
  try {
    const { data } = await axios.get(routes.categoriesSingle(id),  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.error('Не удалось получить категорию', err);
    // message.error('Не удалось получить пост');
    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default fetchCategory;
