import React, { useState } from 'react';

import { HomeOutlined } from '@ant-design/icons';
import Head from 'next/head';
import {NewsCategory, NewsPost, PromoBanner} from '@prisma/client';
import NewsPostForm from '@/features/NewsPostForm';
import Breadcrumbs from '@/features/Breadcrumb';
import { Typography } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import fetchCategories from "@/app/servises/categories/get-all";
import addPost from "@/app/servises/news/add";
import addPromoBanner from "@/app/servises/promo-banners/add";
import PromoBannerForm from "@/features/PromoBannerForm";

const { Title } = Typography;

type Props = {
  token: string;
};

const AddPost = (props: Props) => {
  const { token } = props;
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const paths = [
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      path: '/promo-banners',
      title: 'Промо-баннеры',
    },
    {
      title: 'Добавление промо-баннера',
    },
  ];

  // const [error, setError] = useState('');

  const handleAddPromoBanner = async (data: PromoBanner) => {
    setLoading(true);
    try {
      await addPromoBanner(token, data, () => router.push('/promo-banners'));
      // setLoading(false);
    } catch (err) {
      console.error('Не удалось добавить промо-баннер', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptohost: добавление промо-баннера</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <Title level={2} style={{ padding: '5px 0 15px 0' }}>
        Добавление промо-баннера
      </Title>
      <PromoBannerForm
        onFinish={handleAddPromoBanner}
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
