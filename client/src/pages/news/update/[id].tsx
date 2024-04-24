import React, { useEffect, useState } from 'react';

import { HomeOutlined } from '@ant-design/icons';
import Head from 'next/head';
import { NewsCategory, NewsPost } from '@prisma/client';
import NewsPostForm from '../../../features/NewsPostForm';
import Breadcrumbs from '../../../features/Breadcrumb';
import { Typography } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import fetchCategories from '../../../app/servises/categories/get-all';
import fetchPost from '../../../app/servises/posts/get-one';
import updatePost from '../../../app/servises/posts/update';

const { Title } = Typography;

type Props = {
  post: NewsPost;
  categories: NewsCategory[];
  token: string;
  id: string;
};

const UpdatePost = (props: Props) => {
  const { post, categories, token, id } = props;
  const router = useRouter();

  const paths = [
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      path: '/',
      title: 'Новости',
    },
    {
      title: 'Редактирование новости',
    },
  ];

  const handleUpdateNewsPost = async (data: NewsPost) => {
    try {
      await updatePost(token, id, data, () => router.push('/news'));
    } catch (err) {
      console.error('Не удалось обновить новость', err);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptohost: добавление новости</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <Title level={2} style={{ padding: '5px 0 15px 0' }}>
        Редактирование новости
      </Title>
      <NewsPostForm
        onFinish={handleUpdateNewsPost}
        btnText="Редактировать новость"
        categories={categories}
        token={token}
        post={post}
      />
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = (await getServerSession(
    context.req,
    context.res,
    authOptions
  )) as Session;

  const { params } = context;
  const id = params?.id as string;

  const categories = await fetchCategories(session.user.token);
  const post = await fetchPost(session.user.token, id);

  return {
    props: {
      post,
      categories,
      token: session.user.token,
      id,
    },
  };
};

export default UpdatePost;
