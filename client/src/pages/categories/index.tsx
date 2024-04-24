import { theme } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import Layout from '../../shared/ui/Layout';
import Breadcrumbs from '../../features/Breadcrumb';
import React, {useEffect} from 'react';

const Categories = () => {
  const {
    token: { colorBgContainer, borderRadiusSM },
  } = theme.useToken();

  const paths = [
    {
      path: '/',
      title: <HomeOutlined />,
    },
    {
      title: 'Категории',
    },
  ];

  return (
    <>
      <Breadcrumbs items={paths}></Breadcrumbs>
      <div
        style={{
          padding: 24,
          minHeight: 1360,
          background: colorBgContainer,
          borderRadius: borderRadiusSM,
        }}
      >
        Категории
      </div>
    </>
  );
};

export default Categories;
