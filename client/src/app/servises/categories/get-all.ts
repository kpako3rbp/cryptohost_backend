import axios from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';

const fetchCategories = async (token: string) => {
  try {
    const { data } = await axios.get(routes.categories(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.error('Не удалось получить категории', err);

    if (typeof window !== 'undefined') {
      message.error('Не удалось получить категории');
    }
  }
};

export default fetchCategories;
