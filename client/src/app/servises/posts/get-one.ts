import axios from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';

const fetchPost = async (token: string, id: string) => {
  console.log('routes.newsSingle(id)', routes.newsSingle(id))
  try {
    const { data } = await axios.get(routes.newsSingle(id),  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.error('Не удалось получить пост', err);
    // message.error('Не удалось получить пост');
    if (typeof window !== 'undefined') {
      message.error('Не удалось получить пост');
    }
  }
};

export default fetchPost;