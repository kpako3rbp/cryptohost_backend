import axios from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';

const removePost = async (token: string, id: string) => {
  try {
    const { data } = await axios.post(
      routes.newsRemove(id),
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    message.success(data.message);
  } catch (err) {
    console.error('Не удалось удалить пост', err);

    if (typeof window !== 'undefined') {
      message.error('Не удалось удалить пост');
    }
  }
};

export default removePost;
