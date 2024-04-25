import React from 'react';
import { Card as AntdCard, Tag, theme, Flex } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import CustomButton from '@/shared/ui/CustomButton';

import { NewsCategory, NewsPost } from '@prisma/client';
import { baseUrl, extUrl } from '../../../routes';
import { formatDateTime } from '@/shared/lib/format-date';
import { useRouter } from 'next/router';

import styles from './index.module.scss';
import PostCardSkeleton from "./Skeleton";

type Props = {
  entityName: string;
  updateUrl: string;
  id: string;
  slug: string;
  imageUrl?: string;
  title: string;
  publishedAt: Date;
  updatedAt: Date | null;
  category?: NewsCategory;
  hasTools?: boolean;
  handleRemove?: () => void;
  isLoading: boolean;
};

const PostCard = (props: Props) => {
  const {
    entityName,
    updateUrl,
    id,
    slug,
    imageUrl,
    title,
    publishedAt,
    updatedAt,
    category,
    hasTools = true,
    handleRemove,
    isLoading,
  } = props;
  const {
    token: { colorTextTertiary, colorTextQuaternary, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  if (isLoading) {
    const skeletonCount = 10;
    const skeletons = Array.from({ length: skeletonCount }, (_, index) => (
      <PostCardSkeleton key={index} />
    ));
    return <>{skeletons}</>;
  }

  //console.log("${extUrl}/${router.pathname}/${slug}", `${extUrl}${router.pathname}/${slug}`)
  return (
    <AntdCard style={{ borderRadius: borderRadiusLG, marginTop: '8px' }}>
      <Flex
        gap="large"
        wrap="wrap"
        justify="space-between"
        className={styles.entityCardContent}
      >
        <Flex gap="large" className={styles.entityCardInner}>
          {imageUrl && (
            <div
              className={styles.entityCardCover}
              style={{ borderRadius: borderRadiusLG }}
            >
              <img src={`${baseUrl}/${imageUrl}`} alt={'cover'} />
            </div>
          )}
          <Flex gap={1} vertical className={styles.entityCardInfo}>
            <h2>{title}</h2>
            {category && (
              <Tag
                color={category.color}
                style={{ display: 'inline-block', width: 'fit-content' }}
              >
                {category.name}
              </Tag>
            )}
            <time
              className={styles.entityCardTime}
              style={{ color: colorTextTertiary }}
            >
              {formatDateTime(publishedAt)}{' '}
              {updatedAt && (
                <span style={{ color: colorTextQuaternary }}>
                  / ред. {formatDateTime(updatedAt)}
                </span>
              )}
            </time>
          </Flex>
        </Flex>
        {hasTools && (
          <Flex gap="small" wrap="wrap" vertical>
            <Flex gap="small" wrap="wrap" className={styles.entityCardTools}>
              <Link href={`${updateUrl}/${id}`}>
                <CustomButton
                  popover={'Редактировать'}
                  icon={<EditOutlined />}
                />
              </Link>
              <Link
                href={`${extUrl}${router.pathname}/${slug}`}
                target="_blank"
              >
                <CustomButton
                  popover={`Открыть на сайте: ${`${extUrl}${router.pathname}/${slug}`}`}
                  icon={<ExportOutlined />}
                />
              </Link>
              {handleRemove && (
                <CustomButton
                  // type="primary"
                  // popover={'Удалить'}
                  icon={<DeleteOutlined />}
                  danger
                  confirm={{
                    title: 'Удаление',
                    description: `Вы уверены, что хотите удалить ${entityName}?`,
                    onConfirm: handleRemove,
                  }}
                />
              )}
            </Flex>
          </Flex>
        )}
      </Flex>
      <div className={styles.entityCardTools}></div>
    </AntdCard>
  );
};

export default PostCard;
