import axios, {AxiosError} from 'axios';
import { message } from 'antd';
import routes from "../../../../routes";

const fetchCategories = async (token: string) => {
  try {
    const { data } = await axios.get(routes.getAll('news-categories'), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.error('Не удалось получить категории', err);

    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default fetchCategories;
