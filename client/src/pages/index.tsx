import React from 'react';
import Breadcrumbs from '../features/Breadcrumb';
import Layout from '../shared/ui/Layout';
import { HomeOutlined } from '@ant-design/icons';
import CardGrid from '../shared/ui/CardGrid';
import EntityCard from '../shared/ui/EntityCard';
import FilterPanel from '../features/FilterPanel';
import PageHeaderWithButton from '../features/PageHeaderWithButton';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { fetchPosts } from './api/posts';
import { NewsPost } from '@prisma/client';
import {authOptions} from "./api/auth/[...nextauth]";
import {getServerSession, Session} from "next-auth";

type Props = {
  posts: NewsPost[];
  total: number;
};

const Home = (props: Props) => {
  const { posts, total } = props;

  console.log('props', props)

  const paths = [
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      title: 'Новости',
    },
  ];

  const data = [
    {
      id: '1ке23',
      imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Заголовок новости',
      createdAt: '12 дек 2024, 10:32',
      updatedAt: '14 янв 2025, 12:43',
      category: {
        name: 'Майнинг',
      },
    },
    {
      id: '12нн3',
      imageUrl:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title:
        'Заголовок какой-то невероятно интересной новости, которую просто невозможно забыть',
      createdAt: '31 дек 2024, 10:32',
      updatedAt: null,
      category: {
        name: 'Пресс-релизы',
      },
    },
    {
      id: '1ууке23',
      imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Заголовок новости',
      createdAt: '12 дек 2024, 10:32',
      updatedAt: null,
      category: {
        name: 'Майнинг',
      },
    },
    {
      id: '12еке3',
      imageUrl:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Заголовок какой-то невероятно интересной новости',
      createdAt: '31 дек 2024, 10:32',
      updatedAt: null,
      category: {
        name: 'Пресс-релизы',
      },
    },
    {
      id: '13453453523',
      imageUrl:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Заголовок какой-то невероятно интересной новости',
      createdAt: '31 дек 2024, 10:32',
      updatedAt: '14 янв 2025, 12:43',
      category: {
        name: 'Пресс-релизы',
      },
    },
    {
      id: '12нггн3',
      imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Заголовок новости',
      createdAt: '12 дек 2024, 10:32',
      updatedAt: null,
      category: {
        name: 'Майнинг',
      },
    },
    {
      id: '12534г3',
      imageUrl:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Заголовок какой-то невероятно интересной новости',
      createdAt: '31 дек 2024, 10:32',
      updatedAt: '14 янв 2025, 12:43',
      category: {
        name: 'Пресс-релизы',
      },
    },
    {
      id: '1кенкеекн23',
      imageUrl:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Заголовок какой-то невероятно интересной новости',
      createdAt: '31 дек 2024, 10:32',
      updatedAt: null,
      category: {
        name: 'Пресс-релизы',
      },
    },
    {
      id: '1276онго3',
      imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Заголовок новости',
      createdAt: '12 дек 2024, 10:32',
      updatedAt: '14 янв 2025, 12:43',
      category: {
        name: 'Майнинг',
      },
    },
    {
      id: '12567563',
      imageUrl:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Заголовок какой-то невероятно интересной новости',
      createdAt: '31 дек 2024, 10:32',
      updatedAt: '14 янв 2025, 12:43',
      category: {
        name: 'Пресс-релизы',
      },
    },
    {
      id: '1улшш23',
      imageUrl:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Заголовок какой-то невероятно интересной новости',
      createdAt: '31 дек 2024, 10:32',
      updatedAt: '14 янв 2025, 12:43',
      category: {
        name: 'Пресс-релизы',
      },
    },
    {
      id: '12гггг3',
      imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      title: 'Заголовок новости',
      createdAt: '12 дек 2024, 10:32',
      updatedAt: '14 янв 2025, 12:43',
      category: {
        name: 'Майнинг',
      },
    },
    {
      id: '12ннне553',
      imageUrl:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Заголовок какой-то невероятно интересной новости',
      createdAt: '31 дек 2024, 10:32',
      updatedAt: '14 янв 2025, 12:43',
      category: {
        name: 'Пресс-релизы',
      },
    },
  ];

  return (
    <>
      <Head>
        <title>Cryptohost: admin</title>
      </Head>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <PageHeaderWithButton
        title={'Новости'}
        buttonText={'Создать'}
        buttonLink={'/'}
      />
      <CardGrid>
        <FilterPanel />
        {data.map((post) => (
          <EntityCard
            key={post.id}
            id={post.id}
            imageUrl={post.imageUrl}
            title={post.title}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
            category={post.category}
          />
        ))}
      </CardGrid>
    </>
  );
};

/*export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);

  if (!session || !session.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};*/

export const getServerSideProps = async () => {
  // const session = await getServerSession(authOptions) as Session;

  const { posts, total } = await fetchPosts();
  return {
    props: {
      posts,
      total,
    },
  };
};

export default Home;
