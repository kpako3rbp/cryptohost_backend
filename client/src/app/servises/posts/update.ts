import axios from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';
import { NewsPost } from '@prisma/client';

const updatePost = async (token: string, id: string, formData: NewsPost, callback: () => void) => {
  const requestData = {
    ...formData,
    id,
  };

  try {
    await axios.put(routes.newsUpdate(id), requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    message.success('Новость успешно обновлена!');
    callback();
  } catch (err) {
    console.error('Не удалось обновить новость', err);

    if (typeof window !== 'undefined') {
      message.error('Не удалось обновить новость');
    }
  }
};

export default updatePost;
