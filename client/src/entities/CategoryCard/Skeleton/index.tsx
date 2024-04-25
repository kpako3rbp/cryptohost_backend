import React from 'react';
import {Card as AntdCard, Skeleton, theme, Flex, Tag, Divider, Statistic} from 'antd';

import styles from './index.module.scss';

const CategoryCardSkeleton = () => {
  return (
    <AntdCard style={{ marginTop: '8px' }}>
      <Flex
        gap="large"
        wrap="wrap"
        justify="space-between"
        className={styles.categoryCardContent}
      >
        <Flex gap="large" className={styles.categoryCardInner}>
          <Flex gap={1} vertical className={styles.categoryCardInfo}>
            <Skeleton.Input style={{ width: 220, height: 24 }} active />
            <Skeleton.Input style={{ width: 200, height: 14, marginTop: 5 }} active />
          </Flex>
        </Flex>

        <Flex gap="small" wrap="wrap" vertical>
          <Flex gap="small" className={styles.entityCardTools}  style={{ width: 100 }}>
            <Skeleton.Button size="small" active />
            <Skeleton.Button size="small" active />
          </Flex>
        </Flex>

        <Divider style={{ margin: '0' }}></Divider>

        <Skeleton.Input style={{ width: 180, height: 40 }} active />
      </Flex>
      <div className={styles.categoryCardTools}></div>
    </AntdCard>
  );
};

export default CategoryCardSkeleton;
