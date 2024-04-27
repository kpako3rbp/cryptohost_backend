import React from 'react';
import { Card as AntdCard, Tag, theme, Flex, Divider, Statistic } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Link from 'next/link';
import CustomButton from '@/shared/ui/CustomButton';
import { formatDateTime } from '@/shared/lib/format-date';

import styles from './index.module.scss';
import CategoryCardSkeleton from './Skeleton';

type Props = {
  updateUrl: string;
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  color?: string;
  postsCount: number;
  handleRemove: () => void;
  isLoading: boolean;
};

const CategoryCard = (props: Props) => {
  const {
    updateUrl,
    id,
    name,
    createdAt,
    updatedAt,
    color,
    postsCount,
    handleRemove,
    isLoading,
  } = props;
  const {
    token: { colorTextTertiary, colorTextQuaternary, borderRadiusLG },
  } = theme.useToken();

  if (isLoading) {
    return <CategoryCardSkeleton />;
  }

  return (
    <AntdCard style={{ borderRadius: borderRadiusLG, marginTop: '8px' }}>
      <Flex
        gap="large"
        wrap="wrap"
        justify="space-between"
        className={styles.categoryCardContent}
      >
        <Flex gap="large" className={styles.categoryCardInner}>
          <Flex gap={1} vertical className={styles.categoryCardInfo}>
            <Link href={`${updateUrl}/${id}`}>
              <Tag
                color={color}
                style={{
                  padding: '6px 16px',
                  fontSize: 15,
                  width: 'fit-content',
                }}
                className={styles.categoryCardTag}
              >
                {name}
              </Tag>
            </Link>
            <time
              className={styles.categoryCardTime}
              style={{ color: colorTextTertiary }}
            >
              {formatDateTime(createdAt)}{' '}
              {updatedAt && (
                <span style={{ color: colorTextQuaternary }}>
                  / ред. {formatDateTime(updatedAt)}
                </span>
              )}
            </time>
          </Flex>
        </Flex>

        <Flex gap="small" wrap="wrap" vertical>
          <Flex gap="small" wrap="wrap" className={styles.categoryCardTools}>
            <Link href={`${updateUrl}/${id}`}>
              <CustomButton
                loading={isLoading}
                popover={'Редактировать'}
                icon={<EditOutlined />}
              />
            </Link>
            {postsCount === 0 ? (
              <CustomButton
                loading={isLoading}
                icon={<DeleteOutlined />}
                danger
                confirm={{
                  title: 'Удаление',
                  description: `Вы уверены, что хотите удалить категорию?`,
                  onConfirm: handleRemove,
                }}
              />
            ) : (
              <CustomButton
                loading={isLoading}
                icon={<DeleteOutlined />}
                disabled
                danger
                popover={
                  'Невозможно удалить категорию у которой есть посты, сначала удалите их либо смените им категорию.'
                }
              />
            )}
          </Flex>
        </Flex>

        <Divider style={{ margin: '0' }}></Divider>

        <Statistic title="Постов" value={postsCount} />
      </Flex>
      <div className={styles.categoryCardTools}></div>
    </AntdCard>
  );
};

export default CategoryCard;
