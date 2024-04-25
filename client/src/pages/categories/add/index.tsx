import React, { useState } from 'react';

import { HomeOutlined } from '@ant-design/icons';
import Head from 'next/head';
import { NewsCategory, NewsPost } from '@prisma/client';
import NewsPostForm from '@/features/NewsPostForm';
import Breadcrumbs from '@/features/Breadcrumb';
import { Typography } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import fetchCategories from "@/app/servises/categories/get-all";
import addPost from "@/app/servises/posts/add";
import addCategory from "@/app/servises/categories/add";
import NewsCategoryForm from "@/features/NewsCategoryForm";

const { Title } = Typography;

type Props = {
  categories: NewsCategory[];
  token: string;
};

const AddCategory = (props: Props) => {
  const { token } = props;
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const paths = [
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      path: '/categories',
      title: 'Категории',
    },
    {
      title: 'Добавление категории',
    },
  ];

  // const [error, setError] = useState('');

  const handleAddNewsCategory = async (data: NewsPost) => {
    setLoading(true);
    try {
      await addCategory(token, data, () => router.push('/categories'));
      // setLoading(false);
    } catch (err) {
      console.error('Не удалось добавить категорию', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptohost: добавление категории</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <Title level={2} style={{ padding: '5px 0 15px 0' }}>
        Добавление новости
      </Title>
      <NewsCategoryForm
        onFinish={handleAddNewsCategory}
        token={token}
        loading={loading}
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

  return {
    props: {
      token: session.user.token,
    },
  };
};

export default AddCategory;
