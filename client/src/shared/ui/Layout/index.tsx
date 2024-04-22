import styles from './index.module.scss';

import React, {useEffect, useState} from 'react';
import { Layout as AntdLayout } from 'antd';

import Header from '../../../widgets/Header';
import Sidebar from '../../../widgets/Sidebar';
import cl from 'classnames';

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

  const toggleCollapsed = () => {
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    localStorage.setItem('collapsed', String(newCollapsed));
  };

  return (
    <AntdLayout
      style={{
        minHeight: '100dvh',
        maxHeight: '100dvh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed} hasSidebar={hasSidebar} />
      {hasSidebar && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}
      <AntdLayout
        className={styles.layoutContainer}
        style={{ flexDirection: 'row', height: 'calc(100vh - 64px)' }}
      >
        {hasSidebar && (
          <div
            className={cl(styles.layoutPseudosidebar, {
              [styles.layoutPseudosidebarCollapsed]: collapsed,
            })}
          ></div>
        )}
        <Content
          className={cl(styles.layoutInner, {
            [styles.layoutInnerBlurred]: !collapsed,
          })}
        >
          {children}
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
