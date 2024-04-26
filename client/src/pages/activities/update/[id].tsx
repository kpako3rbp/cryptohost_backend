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
import ActivitiesForm from "@/features/ActivitiesForm";
import fetchActivity from "@/app/servises/activities/get-one";
import updateActivity from "@/app/servises/activities/update";

const { Title } = Typography;

type Props = {
  post: NewsPost;
  categories: NewsCategory[];
  token: string;
  id: string;
};

const UpdatePost = (props: Props) => {
  const { post, token, id } = props;
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const paths = [
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      path: '/activities',
      title: 'Активности',
    },
    {
      title: 'Редактирование активности',
    },
  ];

  const handleUpdateNewsPost = async (data: NewsPost) => {
    setLoading(true);
    try {
      await updateActivity(token, id, data, () => router.push('/activities'));
    } catch (err) {
      console.error('Не удалось обновить активность', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptohost: обновление активности</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <Title level={2} style={{ padding: '5px 0 15px 0' }}>
        Редактирование активности
      </Title>
      <ActivitiesForm
        onFinish={handleUpdateNewsPost}
        btnText="Редактировать активность"
        token={token}
        post={post}
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

  const { params } = context;
  const id = params?.id as string;

  const post = await fetchActivity(session.user.token, id);

  return {
    props: {
      post,
      token: session.user.token,
      id,
    },
  };
};

export default UpdatePost;
