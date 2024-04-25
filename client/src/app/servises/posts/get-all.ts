import axios, {AxiosError} from 'axios';
import { message } from 'antd';
import { SearchNewsParams } from './types';
import routes from "../../../../routes";

const fetchPosts = async (token: string, searchParams?: SearchNewsParams) => {
  const params = {
    page: searchParams?.page,
    pageSize: searchParams?.pageSize,
    categoryIds: JSON.stringify(searchParams?.categoryIds),
    excludeIds: JSON.stringify(searchParams?.excludeIds),
    searchQuery: searchParams?.searchQuery,
    sortField: searchParams?.sortField,
    sortOrder: searchParams?.sortOrder,
  };

  try {
    const { data } = await axios.get(routes.news(), {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (err) {
    console.error('Не удалось получить посты', err);

    if (err instanceof AxiosError && err.response?.data.message) {
      if (typeof window !== 'undefined') {
        message.error(`Ошибка: ${err.response?.data.message}`);
      }
    }
  }
};

export default fetchPosts;
