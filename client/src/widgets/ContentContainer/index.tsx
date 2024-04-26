import styles from './index.module.scss';
import cl from 'classnames';
import { Layout as AntdLayout } from 'antd';
import React, {useEffect, useRef} from 'react';
import {useRouter} from "next/router";

const { Content } = AntdLayout;

type Props = {
  hasSidebar: boolean;
  collapsed: boolean;
  children: React.ReactNode | React.ReactNode[];
};

export const ContentContainer = (props: Props) => {
  const { hasSidebar, collapsed, children } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Прокрутка контейнера до верхней части при загрузке
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, [router.pathname]);

  return (
    <AntdLayout
      ref={contentRef}
      className={styles.layoutContainer}
      style={{ flexDirection: 'row', height: 'calc(100% - 64px)' }}
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
  );
};

export default ContentContainer;
