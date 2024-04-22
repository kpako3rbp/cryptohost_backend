import { Flex, Row, Typography } from 'antd';
import styles from '../../features/PageHeaderWithButton/index.module.scss';
import LoginForm from '../../features/LoginForm';
import Head from 'next/head';
import React from 'react';

const { Title } = Typography;

const Login = () => {
  return (
    <>
      <Head>
        <title>Cryptohost: авторизация</title>
      </Head>
      <Flex
        justify="center"
        vertical
        style={{ minHeight: 'calc(100dvh - 64px)' }}
      >
        <Title
          level={2}
          className={styles.pageHeaderTitle}
          style={{ marginBottom: '40px' }}
        >
          Админ-панель CRYPTOHOST
        </Title>
        <Row align="middle" justify="center">
          <LoginForm />
        </Row>
      </Flex>
    </>
  );
};

export default Login;
