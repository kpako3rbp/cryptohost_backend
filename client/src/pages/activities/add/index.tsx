import React, { useState } from 'react';

import { HomeOutlined } from '@ant-design/icons';
import Head from 'next/head';
import { NewsCategory, NewsPost } from '@prisma/client';
import Breadcrumbs from '@/features/Breadcrumb';
import { Typography } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import fetchCategories from "@/app/servises/categories/get-all";
import addActivity from "@/app/servises/activities/add";
import ActivitiesForm from "@/features/ActivitiesForm";

const { Title } = Typography;

type Props = {
  categories: NewsCategory[];
  token: string;
};

const AddPost = (props: Props) => {
  const { categories, token } = props;
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
      title: 'Добавление активности',
    },
  ];

  // const [error, setError] = useState('');

  const handleAddActivity = async (data: NewsPost) => {
    setLoading(true);
    try {
      await addActivity(token, data, () => router.push('/activities'));
      // setLoading(false);
    } catch (err) {
      console.error('Не удалось добавить активность', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptohost: добавление активности</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <Title level={2} style={{ padding: '5px 0 15px 0' }}>
        Добавление активности
      </Title>
      <ActivitiesForm
        onFinish={handleAddActivity}
        btnText="Добавить активность"
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

  const data = await fetchCategories(session.user.token);
  return {
    props: {
      categories: data,
      token: session.user.token,
    },
  };
};

export default AddPost;
