import '../styles/reset.scss';
import '../styles/globals.scss';

import React from 'react';
// import { ConfigProvider } from 'antd';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import themeConfig from '../styles/themeConfig';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { SessionProvider } from 'next-auth/react';
import Layout from '../shared/ui/Layout';
import { useRouter } from 'next/router';
import Head from 'next/head';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  return (
    <Provider store={store}>
      <ConfigProvider theme={themeConfig}>
        <SessionProvider session={session}>
          <Layout hasSidebar={!isLoginPage}>
            <Head>
              <meta name="format-detection" content="telephone=no" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
              />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
