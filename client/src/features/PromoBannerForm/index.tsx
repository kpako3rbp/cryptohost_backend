import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  InputRef,
  Space,
  theme,
  Typography,
} from 'antd';
import ErrorMessage from '@/shared/ui/ErrorMessage';
import { PromoBanner } from '@prisma/client';
import {
  AlignLeftOutlined,
  FontColorsOutlined, LinkOutlined,
  PictureOutlined,
  WifiOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

import 'easymde/dist/easymde.min.css';
import ImageDragger from '../ImageDragger';

type Props = {
  onFinish: (values: PromoBanner) => void;
  title?: string;
  error?: string;
  banner?: PromoBanner;
  token: string;
  loading: boolean;
};

const PromoBannerForm = (props: Props) => {
  const { onFinish, title, banner, token, loading } = props;
  const {
    token: { colorBorder, colorTextDescription },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <Card title={title} style={{ borderColor: colorBorder }}>
      <Form
        form={form}
        name="news-post-from"
        onFinish={onFinish}
        initialValues={{
          metaTitle: banner?.meta_title,
          title: banner?.title,
          image: banner?.image,
          // publishedAt: moment(post?.published_at).format('YYYY-MM-DD HH:mm:ss'),
          description: banner?.description,
          url: banner?.url,
        }}
      >
        <Divider
          orientation="left"
          orientationMargin="0"
          style={{ color: colorTextDescription }}
        >
          Обязательные поля
        </Divider>

        <div>
          <Title style={{ marginBottom: '0' }} level={5}>
            <FontColorsOutlined /> Заголовок*
          </Title>
          <Text type="secondary">От 3 до 100 символов</Text>
          <Form.Item
            name="title"
            shouldUpdate={true}
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || (value.length >= 3 && value.length <= 100)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Заголовок должен быть от 3 до 100 символов')
                  );
                },
              }),
            ]}
          >
            <Input
              ref={inputRef}
              placeholder="Заголовок"
              type="text"
              size="large"
              style={{ marginTop: '10px' }}
            />
          </Form.Item>
        </div>

        <div style={{ marginTop: 40 }}>
          <Title style={{ marginBottom: '0' }} level={5}>
            <PictureOutlined /> Обложка*
          </Title>
          <Text type="secondary">
            Лучше выбирать горизонтальные или квадратные изображения. На
            основном сайте изображение будет автоматически пикселизировано.
          </Text>
          <Form.Item
            name="image"
            shouldUpdate={true}
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
            ]}
          >
            <ImageDragger
              entityName={'promo-banners'}
              token={token}
              form={form}
              style={{ marginTop: '10px' }}
              imageUrl={banner?.image}
            />
          </Form.Item>
        </div>

        <div style={{ marginTop: 40 }}>
          <Title style={{ marginBottom: '0' }} level={5}>
            <AlignLeftOutlined /> Описание*
          </Title>
          <Text type="secondary">
            От 3 до 100 символов. Коротко опишите суть акции.
          </Text>
          <Form.Item
            name="description"
            shouldUpdate={true}
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || (value.length >= 3 && value.length <= 100)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Текст статьи должен быть от 3 до 100 символов')
                  );
                },
              }),
            ]}
          >
            <Input.TextArea
              placeholder="Описание"
              style={{ marginTop: '10px', height: 100, fontSize: 16}}
            />
          </Form.Item>
        </div>

        <div style={{ marginTop: 40 }}>
          <Title style={{ marginBottom: '0' }} level={5}>
            <LinkOutlined /> Url*
          </Title>
          <Text type="secondary">Ссылка на акцию или на внешний ресурс</Text>
          <Form.Item
            name="url"
            shouldUpdate={true}
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              {
                validator(_, value) {
                  // Проверяем, что значение не пустое и соответствует формату URL
                  if (!value || /^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Пожалуйста, введите корректный URL')
                  );
                },
              },
            ]}
          >
            <Input
              placeholder="Ссылка"
              type="text"
              size="large"
              style={{ marginTop: '10px' }}
            />
          </Form.Item>
        </div>

        <Divider
          orientation="left"
          orientationMargin="0"
          style={{ marginTop: '60px', color: colorTextDescription }}
        >
          Необязательные поля
        </Divider>

        <div>
          <Title style={{ marginBottom: '0' }} level={5}>
            <WifiOutlined /> Мета-заголовок
          </Title>
          <Text type="secondary">
            Нужен для SEO. Если не указать, он будет выставлен автоматически в
            соответствии с заголовком статьи
          </Text>
          <Form.Item
            name="metaTitle"
            shouldUpdate={true}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || (value.length >= 3 && value.length <= 100)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Мета-заголовок должен быть от 3 до 100 символов')
                  );
                },
              }),
            ]}
          >
            <Input
              placeholder="Мета-заголовок"
              type="text"
              size="large"
              style={{ marginTop: '10px' }}
            />
          </Form.Item>
        </div>

        <Button loading={loading} type="primary" size="large" htmlType="submit">
          Сохранить
        </Button>
      </Form>

      <Space
        style={{ width: '100%', marginTop: '20px' }}
        direction="vertical"
        size="large"
      >
        <ErrorMessage message={error} />
      </Space>
    </Card>
  );
};

export default PromoBannerForm;
