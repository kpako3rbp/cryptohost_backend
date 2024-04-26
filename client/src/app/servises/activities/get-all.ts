import axios, {AxiosError} from 'axios';
import { message } from 'antd';
import { SearchPostParams } from './types';
import routes from "../../../../routes";

const fetchActivities = async (token: string, searchParams?: SearchPostParams) => {
  const params = {
    page: searchParams?.page,
    pageSize: searchParams?.pageSize,
    searchQuery: searchParams?.searchQuery,
    sortField: searchParams?.sortField,
    sortOrder: searchParams?.sortOrder,
  };

  try {
    const { data } = await axios.get(routes.getAll('crypto-activities'), {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.error('Не удалось получить активности', err);

    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default fetchActivities;
