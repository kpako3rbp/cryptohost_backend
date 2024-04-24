import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  InputRef,
  Select,
  Space,
  theme,
  Typography,
} from 'antd';
import ErrorMessage from '../../shared/ui/ErrorMessage';
import { NewsCategory, NewsPost } from '@prisma/client';
import {
  AlignLeftOutlined,
  ApartmentOutlined,
  CalendarOutlined,
  FontColorsOutlined,
  PictureOutlined,
  WifiOutlined,
} from '@ant-design/icons';

const { Text, Title } = Typography;

import 'easymde/dist/easymde.min.css';
import ImageDragger from '../ImageDragger';
import TextareaMD from '../TextareaMD';
import dayjs from 'dayjs';

type Props = {
  onFinish: (values: NewsPost) => void;
  btnText: string;
  title?: string;
  error?: string;
  post?: NewsPost;
  categories?: NewsCategory[];
  token: string;
};

const NewsPostForm = (props: Props) => {
  const { onFinish, title, btnText, post, categories, token } = props;
  const {
    token: { borderRadiusLG, colorBorder, colorTextDescription },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const inputRef = useRef<InputRef>(null);

  const selectOptions = categories?.reduce<{ value: string; label: string }[]>(
    (acc, category) => {
      acc.push({ value: category.id, label: category.name });
      return acc;
    },
    []
  );

  useEffect(() => {
    inputRef.current?.focus();

    if (post) {
      setText(post.body);
    }
  }, [form]);

  return (
    <Card title={title} style={{ borderColor: colorBorder }}>
      <Form
        form={form}
        name="news-post-from"
        onFinish={onFinish}
        initialValues={{
          metaTitle: post?.meta_title,
          title: post?.title,
          image: post?.image,
          categoryId: post?.category_id,
          // publishedAt: moment(post?.published_at).format('YYYY-MM-DD HH:mm:ss'),
          body: post?.body,
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
                    new Error('Заголовок должен быть быть от 3 до 100 символов')
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
              token={token}
              form={form}
              style={{ marginTop: '10px' }}
              imageUrl={post?.image}
            />
          </Form.Item>
        </div>

        <div style={{ marginTop: 40 }}></div>
        <Title style={{ marginBottom: '0' }} level={5}>
          <ApartmentOutlined /> Категория*
        </Title>
        <Text type="secondary">Выберите категорию новости</Text>
        <Form.Item
          name="categoryId"
          shouldUpdate={true}
          rules={[
            {
              required: true,
              message: 'Обязательное поле',
            },
          ]}
        >
          <Select
            size="large"
            placeholder="Категория новости"
            style={{ marginTop: '10px' }}
            options={selectOptions}
          />
        </Form.Item>

        <div style={{ marginTop: 40 }}>
          <Title style={{ marginBottom: '0' }} level={5}>
            <AlignLeftOutlined /> Текст новости*
          </Title>
          <Text type="secondary">
            Минимум 3 символа. Воспользуйтесь разметкой, чтобы выделять
            подзаголовки, цитаты, списки и прочее. Вы так же можете добавить
            дополнительные изображения в пост (ссылка на изображение).
          </Text>
          <Form.Item
            name="body"
            shouldUpdate={true}
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value.length >= 10) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Текст статьи должен быть не менее 10 символов')
                  );
                },
              }),
            ]}
          >
            <TextareaMD
              text={text}
              setText={setText}
              form={form}
              style={{ marginTop: '10px', borderRadius: '30px' }}
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
                    new Error(
                      'Мета-заголовок должен быть быть от 3 до 100 символов'
                    )
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

        <div style={{ marginTop: 40 }}>
          <Title style={{ marginBottom: '0' }} level={5}>
            <CalendarOutlined /> Дата и время публикации
          </Title>
          <Text type="secondary">
            Это необязательное поле: если не выбирать дату, то она проставится
            автоматически. Если изменить дату публикации, то новость может быть
            опубликована задним числом
          </Text>
          <Form.Item name="publishedAt" shouldUpdate={true}>
            <DatePicker
              size="large"
              showTime
              needConfirm={false}
              style={{
                marginTop: '10px',
                width: '100%',
                borderRadius: borderRadiusLG,
              }}
              defaultValue={dayjs(post?.published_at) || ''}
            />
          </Form.Item>
        </div>

        <Button type="primary" size="large" htmlType="submit">
          {btnText}
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

export default NewsPostForm;
