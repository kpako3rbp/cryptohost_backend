import axios, {AxiosError} from 'axios';
import { message } from 'antd';
import { NewsPost } from '@prisma/client';
import routes from "../../../../routes";

const addPost = async (token: string, formData: NewsPost, callback: () => void) => {
  try {
    await axios.post(routes.create('news-posts'), formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    message.success('Новость успешно добавлена!');
    callback();
  } catch (err) {
    console.error('Не удалось добавить пост', err);

    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default addPost;
