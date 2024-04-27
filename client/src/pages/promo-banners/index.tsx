import React, { useState } from 'react';
import Breadcrumbs from '@/features/Breadcrumb';
import { HomeOutlined } from '@ant-design/icons';
import PageHeaderWithButton from '@/features/PageHeaderWithButton';
import Head from 'next/head';
// import { fetchPosts } from './api/posts/getAll';
import fetchPosts from '@/app/servises/news/get-all';
import { PromoBanner } from '@prisma/client';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession, Session } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import fetchCategories from '@/app/servises/categories/get-all';
import PostFiltersProvider from '@/app/providers/PostFiltersProvider';
import NewsFeed from '@/features/NewsFeed';
import fetchPromoBanners from "@/app/servises/promo-banners/get-all";
import PromoBannersFeed from "@/features/PromoBannersFeed";

type Props = {
  banners: PromoBanner[];
  total: number;
  token: string;
};

const PromoBanners = (props: Props) => {
  const { banners, total, token } = props;

  const paths = [
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      title: 'Промо-баннеры',
    },
  ];

  return (
    <PostFiltersProvider>
      <Head>
        <title>Cryptohost: промо-баннеры</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <PageHeaderWithButton
        title={'Промо-баннеры'}
        buttonText={'Создать'}
        buttonLink={'promo-banners/add'}
      />
      <PromoBannersFeed
        banners={banners}
        total={total}
        token={token}
      ></PromoBannersFeed>
    </PostFiltersProvider>
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

  const data = await fetchPromoBanners(session.user.token);

  // console.log('posts', postData);
  return {
    props: {
      banners: data?.promoBanners || [],
      total: data?.total || 0,
      token: session.user.token,
    },
  };
};

export default PromoBanners;
