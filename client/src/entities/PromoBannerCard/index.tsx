import React from 'react';
import {
  Card as AntdCard,
  Tag,
  theme,
  Flex,
  Typography,
  Switch,
  Popover,
} from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import CustomButton from '@/shared/ui/CustomButton';

import { NewsCategory, NewsPost } from '@prisma/client';
import {baseUrl, clientDomain, extUrl} from '../../../routes';
import { formatDateTime } from '@/shared/lib/format-date';
import { useRouter } from 'next/router';

const { Text, Title } = Typography;

import styles from './index.module.scss';
import PostCardSkeleton from './Skeleton';
import PromoBannerSkeleton from "./Skeleton";

type Props = {
  entityName: string;
  updateUrl: string;
  id: string;
  imageUrl?: string;
  isMain: boolean;
  title: string;
  createdAt: Date;
  updatedAt: Date | null;
  description: string;
  hasTools?: boolean;
  handleRemove?: () => void;
  handleSetMainBanner?: () => void;
  isLoading: boolean;
};

const PromoBannerCard = (props: Props) => {
  const {
    entityName,
    updateUrl,
    id,
    imageUrl,
    title,
    createdAt,
    updatedAt,
    description,
    hasTools = true,
    handleRemove,
    handleSetMainBanner,
    isLoading,
    isMain,
  } = props;
  const {
    token: { colorTextTertiary, colorTextQuaternary, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

  if (isLoading) {
    const skeletonCount = 1;
    const skeletons = Array.from({ length: skeletonCount }, (_, index) => (
      <PromoBannerSkeleton key={index} />
    ));
    return <>{skeletons}</>;
  }

  //console.log("${extUrl}/${router.pathname}/${slug}", `${extUrl}${router.pathname}/${slug}`)
  return (
    <AntdCard
      style={{
        borderRadius: borderRadiusLG,
        marginTop: '8px',
        borderColor: isMain ? 'var(--purple-color)' : '',
      }}
    >
      <Flex
        gap="large"
        wrap="wrap"
        justify="space-between"
        className={styles.entityCardContent}
      >
        <Flex gap="large" className={styles.entityCardInner}>
          {imageUrl && (
            <Link
              href={`${updateUrl}/${id}`}
              className={styles.entityCardCover}
              style={{ borderRadius: borderRadiusLG }}
            >
              <img src={`${clientDomain}/${imageUrl}`} alt={'cover'} />
            </Link>
          )}
          <Flex gap={1} vertical className={styles.entityCardInfo}>
            <Link
              href={`${updateUrl}/${id}`}
              className={styles.entityCardTitle}
            >
              <Title level={4}>{title}</Title>
            </Link>

            <Flex>
              <Text >{description}</Text>
            </Flex>

            <time
              className={styles.entityCardTime}
              style={{ color: colorTextTertiary }}
            >
              {formatDateTime(createdAt)}{' '}
              {updatedAt && (
                <span style={{ color: colorTextQuaternary }}>
                  / ред. {formatDateTime(updatedAt)}
                </span>
              )}
            </time>

            {isMain ? (
              <Popover
                content={
                  'Баннер размещен на главной странице. Чтобы изменить главный баннер вы можете либо отредактировать этот, либо создать новый и разместить его на главную.'
                }
              >
                <Flex
                  align={'center'}
                  style={{
                    marginTop: 20,
                    borderRadius: 8,
                    backgroundColor: '#d9c9f6',
                    width: 'fit-content',
                    border: '1px solid var(--purple-color)',
                  }}
                >
                  <CheckOutlined style={{ color: 'var(--purple-color)', paddingLeft: 14 }} />
                  <Text
                    style={{ color: 'var(--purple-color)',padding: '3px 14px 3px 10px' }}
                  >
                    На главной
                  </Text>
                </Flex>
              </Popover>
            ) : (
              <Flex align={'flex-end'} style={{ marginTop: 20 }}>
                <Switch
                  defaultChecked={isMain}
                  onChange={handleSetMainBanner}
                  className={styles.entityCardToggle}
                />
                <Text style={{ marginLeft: 10 }}>На главную</Text>
              </Flex>
            )}
          </Flex>
        </Flex>
        {hasTools && (
          <Flex gap="small" wrap="wrap" vertical>
            <Flex gap="small" wrap="wrap" className={styles.entityCardTools}>
              <Link href={`${updateUrl}/${id}`}>
                <CustomButton
                  loading={isLoading}
                  popover={'Редактировать'}
                  icon={<EditOutlined />}
                />
              </Link>
              {handleRemove && (
                <CustomButton
                  loading={isLoading}
                  disabled={isMain}
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

export default PromoBannerCard;
