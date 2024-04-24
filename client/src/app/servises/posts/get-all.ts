import axios from 'axios';
import routes from '../../../../routes';
import { message } from 'antd';
import { SearchNewsParams } from './types';

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

    if (typeof window !== 'undefined') {
      message.error('Не удалось получить посты');
    }
  }
};

export default fetchPosts;
