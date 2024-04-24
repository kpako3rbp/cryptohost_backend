import '../styles/reset.scss';
import '../styles/globals.scss';

import React, { useEffect, useState } from 'react';
// import { ConfigProvider } from 'antd';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';

import themeConfig from '../styles/themeConfig';
import locale from 'antd/locale/ru_RU';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { SessionProvider } from 'next-auth/react';
import Layout from '../shared/ui/Layout';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Preloader from '../shared/ui/Preloader';

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';

  const [loading, setLoading] = useState(false);

  router.events?.on('routeChangeStart', () => {
    setLoading(true);
  });

  router.events?.on('routeChangeComplete', () => {
    setLoading(false);
  });

  router.events?.on('routeChangeError', () => {
    setLoading(false);
  });

  return (
    <Provider store={store}>
      <ConfigProvider theme={themeConfig} locale={locale}>
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
            {loading && <Preloader isGlobal={true} />}
          </Layout>
        </SessionProvider>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
