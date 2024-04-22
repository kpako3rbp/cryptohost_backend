// Определение типа для объекта запроса
import { NextApiRequest, NextApiResponse } from 'next';
import { NewsPost } from '@prisma/client';
import routes from '../../../../routes';
import axios from 'axios';
// import axios from '../../../../axios.js';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession, Session } from 'next-auth';
import {getToken} from "next-auth/jwt";

type RequestQuery = {
  page?: number;
  pageSize?: number;
  categoryIds?: string[];
  excludeIds?: string[];
};

// pages/api/posts/index.js
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<NewsPost[]>
) => {
  const { page, pageSize, categoryIds, excludeIds } = req.query as RequestQuery;

  try {
    const data = await fetchPosts(page, pageSize, categoryIds, excludeIds);
    console.log('POSTS', data);
    res.status(200).json(data);
  } catch (error) {
    console.error('Ошибка при загрузке постов:', error);
    res.status(500).json(error);
  }
};

// Функция для загрузки постов (пример)
export const fetchPosts = async (
  // token: string,
  page?: number,
  pageSize?: number,
  categoryIds?: string[],
  excludeIds?: string[]
) => {
  const params = {
    page,
    pageSize,
    categoryIds: JSON.stringify(categoryIds),
    excludeIds: JSON.stringify(excludeIds),
  };

  // const session = await getServerSession(authOptions);
  // const token = await getToken({ req, secret })

  // нужен токен в заголовок!!!
  const { data } = await axios.get(routes.news(), { params });

  console.log('DATA', data);

  return data;
};

export default handler;
