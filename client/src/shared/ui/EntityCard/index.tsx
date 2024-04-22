import cl from 'classnames';
import React from 'react';

import styles from './index.module.scss';
import {
  Col,
  Row,
  Card as AntdCard,
  Tag,
  theme,
  Flex,
  FloatButton,
  Button,
  Popover,
} from 'antd';
import { Gutter } from 'antd/es/grid/row';
import {
  DeleteOutlined,
  EditOutlined,
  LinkOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import ButtonRounded from "../ButtonRounded";

type Props = {
  id: string;
  imageUrl: string;
  title: string;
  createdAt: string;
  updatedAt: string | null;
  category?: {
    name: string;
  };
  hasTools?: boolean;
  handleRemove?: (id: string) => void;
};

const EntityCard = (props: Props) => {
  const {
    id,
    imageUrl,
    title,
    createdAt,
    updatedAt,
    category,
    hasTools = true,
    handleRemove = () => console.error('Remove function is not defined!'),
  } = props;
  const {
    token: {
      colorTextTertiary,
      colorTextQuaternary,
      borderRadiusSM,
      borderRadiusLG,
      boxShadowTertiary,
    },
  } = theme.useToken();

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
              <img src={imageUrl} alt={'cover'} />
            </div>
          )}
          <Flex gap={1} vertical className={styles.entityCardInfo}>
            <h2>{title}</h2>
            {category && (
              <Tag
                color="cyan"
                style={{ display: 'inline-block', width: 'fit-content' }}
              >
                {category.name}
              </Tag>
            )}
            <time
              className={styles.entityCardTime}
              style={{ color: colorTextTertiary }}
            >
              {createdAt}{' '}
              {updatedAt && (
                <span style={{ color: colorTextQuaternary }}>
                  / ред. {updatedAt}
                </span>
              )}
            </time>
          </Flex>
        </Flex>
        {hasTools && (
          <Flex gap="small" wrap="wrap" vertical>
            <Flex gap="small" wrap="wrap" className={styles.entityCardTools}>
              <Link href={''}>
                <ButtonRounded
                  popover={'Редактировать'}
                  icon={<EditOutlined />}
                />
              </Link>
              <Link href={''}>
                <ButtonRounded
                  popover={'Открыть на сайте'}
                  icon={<LinkOutlined />}
                />

              </Link>
              <ButtonRounded
                // type="primary"
                popover={'Удалить'}
                onClick={() => handleRemove(id)}
                icon={<DeleteOutlined />}
                danger
              />

            </Flex>
          </Flex>
        )}
      </Flex>
      <div className={styles.entityCardTools}></div>
    </AntdCard>
  );
};

export default EntityCard;
