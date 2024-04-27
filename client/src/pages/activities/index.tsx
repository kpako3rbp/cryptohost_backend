import React, { useState } from 'react';
import Breadcrumbs from '@/features/Breadcrumb';
import { HomeOutlined } from '@ant-design/icons';
import PageHeaderWithButton from '@/features/PageHeaderWithButton';
import Head from 'next/head';
// import { fetchPosts } from './api/posts/getAll';
import fetchPosts from '@/app/servises/news/get-all';
import { NewsCategory, CryptoActivity } from '@prisma/client';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession, Session } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import fetchCategories from '@/app/servises/categories/get-all';
import PostFiltersProvider from '@/app/providers/PostFiltersProvider';
import NewsFeed from '@/features/NewsFeed';
import fetchActivities from "@/app/servises/activities/get-all";
import categories from "@/pages/categories";
import ActivitiesFeed from "@/features/ActivitiesFeed";

type Props = {
  posts: CryptoActivity[];
  total: number;
  token: string;
};

const Activities = (props: Props) => {
  const { posts, total, token } = props;

  const paths = [
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      title: 'Активности',
    },
  ];

  return (
    <PostFiltersProvider>
      <Head>
        <title>Cryptohost: активности</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <PageHeaderWithButton
        title={'Криптоактивности'}
        buttonText={'Создать'}
        buttonLink={'activities/add'}
      />
      <ActivitiesFeed
        posts={posts}
        total={total}
        token={token}
      ></ActivitiesFeed>
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

  const postData = await fetchActivities(session.user.token);

  return {
    props: {
      posts: postData?.activities || [],
      total: postData?.total || 0,
      token: session.user.token,
    },
  };
};

export default Activities;
