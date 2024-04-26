import axios, {AxiosError} from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';

const removeActivity = async (token: string, id: string) => {
  try {
    const { data } = await axios.post(
      routes.remove('crypto-activities', id),
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

    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default removeActivity;
