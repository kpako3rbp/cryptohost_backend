import React, { useState } from 'react';
import Breadcrumbs from '@/features/Breadcrumb';
import { HomeOutlined } from '@ant-design/icons';
import PageHeaderWithButton from '@/features/PageHeaderWithButton';
import Head from 'next/head';
import { authOptions } from '../api/auth/[...nextauth]';
import { getServerSession, Session } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import fetchCategories from '@/app/servises/categories/get-all';
import CategoryCard from '@/entities/CategoryCard';
import {Col, message, Row} from 'antd';
import { NewsCategory } from '@prisma/client';
import fetchPosts from "@/app/servises/posts/get-all";
import removeCategory from "@/app/servises/categories/remove";

type Props = {
  token: string;
  categories: NewsCategory[];
};

const Categories = (props: Props) => {
  const { token, categories } = props;

  const [currentCategories, setCurrentCategories] = useState(categories);

  const [isLoading, setIsLoading] = useState(false);

  const paths = [
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      title: 'Категории новостей',
    },
  ];

  const handleRemoveCategory = async (id: string) => {
    setIsLoading(true);
    try {
      await removeCategory(token, id);
      const data = await fetchCategories(token);

      setCurrentCategories(data);
      // setIsLoading(false);
    } catch (err) {
      message.error('Ошибка при удалении категории');
      console.error('Ошибка при удалении категории', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Cryptohost: категории</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <PageHeaderWithButton
        title={'Категории'}
        buttonText={'Создать'}
        buttonLink={'categories/add'}
      />
      <Row gutter={[16, 16]}>
        {currentCategories.map((category) => (
          <Col
            xs={{ flex: '100%' }}
            sm={{ flex: '100%' }}
            md={{ flex: '50%' }}
            lg={{ flex: '50%' }}
            xl={{ flex: '50%' }}
          >
            <CategoryCard
              key={category.id}
              updateUrl={'categories/update'}
              id={category.id}
              name={category.name}
              createdAt={category.created_at}
              updatedAt={category.updated_at}
              color={category.color}
              postsCount={category.posts_count}
              handleRemove={() => handleRemoveCategory(category.id)}
              isLoading={isLoading}
            />
          </Col>
        ))}
      </Row>
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

  const categories = await fetchCategories(session.user.token);

  return {
    props: {
      categories,
      token: session.user.token,
    },
  };
};

export default Categories;
