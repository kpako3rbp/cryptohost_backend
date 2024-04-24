import React from 'react';
import { Card as AntdCard, Skeleton, theme, Flex } from 'antd';

import styles from './index.module.scss';

const EntityCardSkeleton = () => {
  const { token } = theme.useToken();
  return (
    <AntdCard style={{ borderRadius: token.borderRadiusLG, marginTop: '8px' }}>
      <Flex
        gap="large"
        wrap="wrap"
        justify="space-between"
        className={styles.entityCardContent}
      >
        <Flex gap="large" className={styles.entityCardInner}>
          <div
            className={styles.entityCardCover}
            style={{ borderRadius: token.borderRadiusLG }}
          >
            <Skeleton.Image />
          </div>
          <Flex gap={1} vertical className={styles.entityCardInfo}>
            <Skeleton.Input style={{ width: 220, height: 24 }} active />
            <Skeleton.Input style={{ width: 50, height: 20, marginTop: 5 }} active />
            <Skeleton.Input style={{ width: 200, height: 14, marginTop: 5 }} active />
          </Flex>
        </Flex>
        <Flex gap="small" wrap="wrap" vertical>
          <Flex gap="small" wrap="wrap" className={styles.entityCardTools}>
            <Skeleton.Button size="small" active />
            <Skeleton.Button size="small" active />
            <Skeleton.Button size="small" active />
          </Flex>
        </Flex>
      </Flex>
    </AntdCard>
  );
};

export default EntityCardSkeleton;
