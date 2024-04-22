import React from 'react';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

type BreadcrumbItem = {
  path?: string;
  title: string | JSX.Element;
};

type Props = {
  items: BreadcrumbItem[];
};

const Breadcrumbs = (props: Props) => {
  const { items } = props;

  const itemRender = (
    currentRoute: any,
    params: any,
    items: any[],
    paths: string[]
  ) => {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;

    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <Link href={`/${paths.join('/')}`}>{currentRoute.title}</Link>
    );
  };

  return (
    <Breadcrumb
      style={{ margin: '16px 0' }}
      itemRender={itemRender}
      items={items}
    />
  );
};

export default Breadcrumbs;
