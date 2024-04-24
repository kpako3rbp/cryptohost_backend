import React, { useState } from 'react';
import Breadcrumbs from '../../features/Breadcrumb';
import { HomeOutlined } from '@ant-design/icons';
import CardGrid from '../../shared/ui/CardGrid';
import EntityCard from '../../entities/EntityCard';
import FilterPanel from '../../features/FilterPanel';
import PageHeaderWithButton from '../../features/PageHeaderWithButton';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
// import { fetchPosts } from './api/posts/getAll';
import fetchPosts from '../../app/servises/posts/get-all';
import { NewsCategory, NewsPost } from '@prisma/client';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession, Session } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { Card, Empty, message, Pagination } from 'antd';
import axios from 'axios';
import removePost from '../../app/servises/posts/remove';
import FilterPosts from '../../features/FilterPosts';
import { SearchNewsParams } from '../../app/servises/posts/types';
import fetchCategories from '../../app/servises/categories/get-all';
import PostFilterProvider from "../../app/providers/PostFiltersProvider";

type NewsPostWithCategory = NewsPost & {
  category: NewsCategory;
};

type Props = {
  posts: NewsPostWithCategory[];
  total: number;
  token: string;
  categories: NewsCategory[];
};

const Home = (props: Props) => {
  const { posts, total, token, categories } = props;
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [currentTotal, setCurrentTotal] = useState(total);

  const [currentPage, resetCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const paths = [
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      title: 'Новости',
    },
  ];

  const handlePagination = async (page: number, pageSize: number) => {
    setIsLoading(true);
    try {
      const data = await fetchPosts(token, { page, pageSize });

      // console.log('data', data)

      setCurrentPosts(data.posts);
      setCurrentTotal(data.total);
      // setIsLoading(false);
    } catch (err) {
      message.error('Ошибка при пагинации постов');
      console.error('Ошибка при пагинации постов', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterPosts = async (params: SearchNewsParams) => {
    setIsLoading(true);
    try {
      const data = await fetchPosts(token, params);

      setCurrentPosts(data.posts);
      setCurrentTotal(data.total);
      // setIsLoading(false);
    } catch (err) {
      message.error('Ошибка при фильтрации постов');
      console.error('Ошибка при фильтрации постов', err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePost = async (id: string) => {
    setIsLoading(true);
    try {
      await removePost(token, id);
      const data = await fetchPosts(token);

      setCurrentPosts(data.posts);
      setCurrentTotal(data.total);
      // setIsLoading(false);
    } catch (err) {
      message.error('Ошибка при удалении поста');
      console.error('Ошибка при удалении поста', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PostFilterProvider>
      <Head>
        <title>Cryptohost: admin</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <PageHeaderWithButton
        title={'Новости'}
        buttonText={'Создать'}
        buttonLink={'news/add'}
      />
      <CardGrid>
        <FilterPosts
          categories={categories}
          callback={handleFilterPosts}
          resetPagination={() => resetCurrentPage(1)}
        />
        {currentPosts.length > 0 ? (
          <>
            {currentPosts.map((post) => (
              <EntityCard
                entityName={'новость'}
                updateUrl={'news/update'}
                key={post.id}
                id={post.id}
                slug={post.slug}
                imageUrl={post.image}
                title={post.title}
                publishedAt={post.published_at}
                updatedAt={post.updated_at}
                category={post.category}
                handleRemove={() => handleRemovePost(post.id)}
                isLoading={isLoading}
              />
            ))}
            <Pagination
              style={{ marginTop: '20px', borderRadius: '50px' }}
              total={currentTotal}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} из ${total}`
              }
              defaultPageSize={10}
              defaultCurrent={currentPage}
              onChange={handlePagination}
            />
          </>
        ) : (
          <Card style={{ marginTop: '10px' }}>
            <Empty />
          </Card>
        )}
      </CardGrid>
    </PostFilterProvider>
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

export default Home;
