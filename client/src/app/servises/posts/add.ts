import axios from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';
import { NewsPost } from '@prisma/client';

const addPost = async (token: string, formData: NewsPost, callback: () => void) => {
  try {
    await axios.post(routes.newsCreate(), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    message.success('Новость успешно добавлена!');
    callback();
  } catch (err) {
    console.error('Не удалось добавить пост', err);

    if (typeof window !== 'undefined') {
      message.error('Не удалось добавить пост');
    }
  }
};

export default addPost;
