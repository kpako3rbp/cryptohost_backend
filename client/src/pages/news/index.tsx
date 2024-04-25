import React, { useState } from 'react';
import Breadcrumbs from '@/features/Breadcrumb';
import { HomeOutlined } from '@ant-design/icons';
import PageHeaderWithButton from '@/features/PageHeaderWithButton';
import Head from 'next/head';
// import { fetchPosts } from './api/posts/getAll';
import fetchPosts from '@/app/servises/posts/get-all';
import { NewsCategory, NewsPost } from '@prisma/client';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession, Session } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import fetchCategories from '@/app/servises/categories/get-all';
import PostFiltersProvider from '@/app/providers/PostFiltersProvider';
import NewsFeed from '@/features/NewsFeed';

type NewsPostWithCategory = NewsPost & {
  category: NewsCategory;
};

type Props = {
  posts: NewsPostWithCategory[];
  total: number;
  token: string;
  categories: NewsCategory[];
};

const News = (props: Props) => {
  const { posts, total, token, categories } = props;

  const paths = [
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      title: 'Новости',
    },
  ];

  return (
    <PostFiltersProvider>
      <Head>
        <title>Cryptohost: новости</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <PageHeaderWithButton
        title={'Новости'}
        buttonText={'Создать'}
        buttonLink={'news/add'}
      />
      <NewsFeed
        categories={categories}
        posts={posts}
        total={total}
        token={token}
      ></NewsFeed>
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

  const postData = await fetchPosts(session.user.token);
  const categories = await fetchCategories(session.user.token);

  console.log('posts', postData);
  return {
    props: {
      posts: postData?.posts || [],
      total: postData?.total || 0,
      categories,
      token: session.user.token,
    },
  };
};

export default News;
