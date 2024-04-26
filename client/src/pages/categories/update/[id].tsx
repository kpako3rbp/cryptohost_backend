import React, { useEffect, useState } from 'react';

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
import fetchCategories from '@/app/servises/categories/get-all';
import fetchPost from '@/app/servises/posts/get-one';
import updatePost from '@/app/servises/posts/update';
import AddCategory from "@/pages/categories/add";
import NewsCategoryForm from "@/features/NewsCategoryForm";
import updateCategory from "@/app/servises/categories/update";
import fetchCategory from "@/app/servises/categories/get-one";

const { Title } = Typography;

type Props = {
  category: NewsCategory;
  token: string;
  id: string;
};

const UpdateCategory = (props: Props) => {
  const { category, token, id } = props;
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
      title: 'Редактирование категории',
    },
  ];

  const handleUpdateCategory = async (data: NewsPost) => {
    setLoading(true);
    try {
      await updateCategory(token, id, data, () => router.push('/categories'));
    } catch (err) {
      console.error('Не удалось обновить новость', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptohost: редактирование категории</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <Title level={2} style={{ padding: '5px 0 15px 0' }}>
        Редактирование категории
      </Title>
      <NewsCategoryForm
        onFinish={handleUpdateCategory}
        token={token}
        loading={loading}
        category={category}
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

  const category = await fetchCategory(session.user.token, id);

  return {
    props: {
      category,
      token: session.user.token,
      id,
    },
  };
};

export default UpdateCategory;
