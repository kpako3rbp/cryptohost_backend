import { useRouter } from 'next/router';
// import { AdminData, useLoginMutation } from '../../app/servises/auth';
// import type { AdminData } from '../../app/servises/auth';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Form, Input, InputRef, Space, Spin, theme } from 'antd';
import { isErrorWithMessage } from '@/shared/lib/is-error-with-message';
import Layout from '@/shared/ui/Layout';
import styles from '../PageHeaderWithButton/index.module.scss';
import { getSession, useSession } from 'next-auth/react';
import ErrorMessage from '@/shared/ui/ErrorMessage';
import { signIn } from 'next-auth/react';
import { providers } from 'next-auth/core/routes';
import { GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const { data: session, status } = useSession(); // Используем хук useSession
  const {
    token: { colorBorder },
  } = theme.useToken();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  // const callbackUrl = router.query.callbackUrl ? new URL(router.query.callbackUrl as string).pathname : '/news';

  console.log('callbackUrl@@@@@@@@@@@@@@!!!!!!', router.query.callbackUrl)

  const login = async (credentials: { login: string; password: string }) => {
    try {
      setLoading(true);
      const res = await signIn('credentials', {
        login: credentials.login.trim().toLowerCase(),
        password: credentials.password.trim(),
        redirect: true, // TODO нормально настроить редирект
        callbackUrl: router.query.callbackUrl as string,
      });

      if (res?.error) {
        throw {
          data: {
            message: res.error,
          },
        };
      }
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError(`Неизвестная ошибка ${err}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Если пользователь уже аутентифицирован, перенаправляем его на главную страницу
  if (session && status === 'authenticated') {
    router.push('/');
    // return <></>;
  }

  return (
    <Card
      title="Авторизация"
      style={{ width: '30rem', borderColor: colorBorder }}
    >
      <Form onFinish={login}>
        <Form.Item
          name="login"
          shouldUpdate={true}
          rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]}
        >
          <Input
            ref={inputRef}
            placeholder="Логин"
            type="text"
            name="login"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          // dependencies={dependencies}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]}
        >
          <Input.Password placeholder="Пароль" size="large" />
        </Form.Item>
        <Button type="primary" size="large" htmlType="submit" loading={loading}>
          Войти
        </Button>
      </Form>

      <Space
        style={{ width: '100%', marginTop: '20px' }}
        direction="vertical"
        size="large"
      >
        <ErrorMessage message={error} />
      </Space>
    </Card>
  );
};

export default LoginForm;
