import axios, {AxiosError} from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';

const fetchPost = async (token: string, id: string) => {
  // console.log('routes.newsSingle(id)', routes.newsSingle(id))
  try {
    const { data } = await axios.get(routes.getOne('news-posts', id),  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.error('Не удалось получить пост', err);
    // message.error('Не удалось получить пост');
    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default fetchPost;
