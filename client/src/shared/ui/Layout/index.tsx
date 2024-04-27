import styles from './index.module.scss';

import React, {useEffect, useState} from 'react';
import { Layout as AntdLayout } from 'antd';

import Header from '../../../widgets/Header';
import Sidebar from '../../../widgets/Sidebar';
import cl from 'classnames';
import {useRouter} from "next/router";
import ContentContainer from "@/shared/ui/ContentContainer";

const { Content } = AntdLayout;

type Props = {
  children: React.ReactNode;
  hasSidebar?: boolean;
};

const Layout = (props: Props) => {
  const { children, hasSidebar = true } = props;

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!hasSidebar) {
      setCollapsed(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 500);
  }, []);


  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem('collapsed', String(newCollapsed));
  };

  return (
    <AntdLayout
      style={{
        minHeight: '100vh',
        position: 'relative',
      }}
      className={styles.layout}
    >
      <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} hasSidebar={hasSidebar} />
      {hasSidebar && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}
      <ContentContainer hasSidebar={hasSidebar} collapsed={collapsed} children={children} />
    </AntdLayout>
  );
};

export default Layout;
