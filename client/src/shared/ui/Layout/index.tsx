import styles from './index.module.scss';

import React, {useEffect, useState} from 'react';
import { Layout as AntdLayout } from 'antd';

import Header from '../../../widgets/Header';
import Sidebar from '../../../widgets/Sidebar';
import cl from 'classnames';
import {useRouter} from "next/router";
import ContentContainer from "@/widgets/ContentContainer";

const { Content } = AntdLayout;

type Props = {
  children: React.ReactNode;
  hasSidebar?: boolean;
};

const Layout = (props: Props) => {
  const { children, hasSidebar = true } = props;

  const [collapsed, setCollapsed] = useState(false);
  const [height, setHeight] = useState(800);


  useEffect(() => {
    if (!hasSidebar) {
      setCollapsed(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 500);
  }, []);

  useEffect(() => {
    setHeight(window.innerHeight);

    const handleResize = () => {
      // console.log('window.innerHeight', window.innerHeight)
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem('collapsed', String(newCollapsed));
  };

  return (
    <AntdLayout
      style={{
        height,
        minHeight: height,
        maxHeight: height,
        overflow: 'hidden',
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
