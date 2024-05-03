import React, {useRef, useState} from 'react';
import cl from 'classnames';
import {
  Avatar,
  Button,
  Flex,
  Layout, message,
  Popover,
  Space,
  Spin,
  theme,
} from 'antd';
import Logo from '@/shared/ui/Logo';
import {
  DeleteOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header: AntdHeader } = Layout;

import styles from './index.module.scss';
import CustomButton from '@/shared/ui/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
// import { logout, selectUser } from '../../redux/slices/auth';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

type Props = {
  collapsed: boolean;
  hasSidebar: boolean;
  toggleCollapsed: () => void;
};

const Header = (props: Props) => {
  const { collapsed, toggleCollapsed, hasSidebar } = props;
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const {
    token: { colorBgContainer, colorError },
  } = theme.useToken();
  const router = useRouter();

  const onLogoutClick = async () => {
    try {
      setLoading(true);
      const data = await signOut({
        redirect: false,
        callbackUrl: '/login',
      });

      router.push(data.url);
    } catch (err) {
      message.error('Произошла ошибка при выходе из кабинета');
      console.error('Произошла ошибка при выходе из кабинета', err);
    } finally {
      setLoading(false);
    }
  };

  if (!hasSidebar) {
    return (
      <header
        style={{
          padding: 0,
          borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
          display: 'flex',
          background: colorBgContainer,
          position: "fixed",
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: 64,
          zIndex: 9,
        }}
      >
        <Logo />
      </header>
    );
  }

  return (
    <>
      {loading && <Spin size="large" fullscreen />}
      <AntdHeader
        className={styles.header}
        style={{
          padding: 0,
          borderBottom: '1px solid rgba(5, 5, 5, 0.06)',
          display: 'flex',
          background: colorBgContainer,
        }}
      >
        <Space
          className={cl(styles.headerLogoContainer, {
            [styles.headerLogoContainerSmall]: collapsed,
          })}
        >
          <Logo icon={collapsed} />
        </Space>
        <Space className={styles.headerToolsContainer}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{
              fontSize: '14px',
              width: 64,
              height: 64,
            }}
          />
          {session?.user && (
            <Flex align="center" gap="large">
              <Flex align="center" gap="small">
                <Avatar style={{ backgroundColor: 'var(--purple-color)' }}>
                  {session.user.login.slice(0, 1).toUpperCase()}
                </Avatar>
                <div>{session.user.login}</div>
              </Flex>
              <CustomButton
                loading={loading}
                onClick={onLogoutClick}
                popover="Выйти"
                danger
                icon={<LogoutOutlined />}
              />
            </Flex>
          )}
        </Space>
        <Space></Space>
      </AntdHeader>
    </>
  );
};

export default Header;
