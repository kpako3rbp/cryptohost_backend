import React, { useState } from 'react';

import { HomeOutlined } from '@ant-design/icons';
import Head from 'next/head';
import {PromoBanner} from '@prisma/client';
import Breadcrumbs from '@/features/Breadcrumb';
import { Typography } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]';
import { useRouter } from 'next/router';
import updatePromoBanner from "@/app/servises/promo-banners/update";
import PromoBannerForm from "@/features/PromoBannerForm";
import fetchPromoBanner from "@/app/servises/promo-banners/get-one";

const { Title } = Typography;

type Props = {
  banner: PromoBanner;
  token: string;
  id: string;
};

const UpdatePost = (props: Props) => {
  const { banner, token, id } = props;
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
      title: 'Редактирование промо-баннера',
    },
  ];

  const handleUpdatePromoBanner = async (data: PromoBanner) => {
    setLoading(true);
    try {
      await updatePromoBanner(token, id, data, () => router.push('/promo-banners'));
    } catch (err) {
      console.error('Не удалось обновить промо-баннер', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptohost: обновление промо-баннера</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <Title level={2} style={{ padding: '5px 0 15px 0' }}>
        Редактирование промо-баннера
      </Title>
      <PromoBannerForm
        onFinish={handleUpdatePromoBanner}
        token={token}
        loading={loading}
        banner={banner}
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

  const banner = await fetchPromoBanner(session.user.token, id);

  return {
    props: {
      banner,
      token: session.user.token,
      id,
    },
  };
};

export default UpdatePost;
