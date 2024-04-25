import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  InputRef,
  Radio,
  Select,
  Space, Tag,
  theme,
  Typography,
} from 'antd';
import ErrorMessage from '@/shared/ui/ErrorMessage';
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
  token: string;
  loading: boolean;
  category?: NewsCategory;
};

const NewsCategoryForm = (props: Props) => {
  const { onFinish, token, loading, category } = props;
  const {
    token: { borderRadiusLG, colorBorder, colorTextDescription },
  } = theme.useToken();

  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const inputRef = useRef<InputRef>(null);

  const tagsData = ['Movies', 'Books', 'Music', 'Sports'];

  return (
    <Card title="Категория" style={{ borderColor: colorBorder }}>
      <Form
        form={form}
        name="news-category-form"
        onFinish={onFinish}
        initialValues={{
          name: category?.name,
          color: category?.color,
        }}
      >
        <div>
          <Title style={{ marginBottom: '0' }} level={5}>
            <FontColorsOutlined /> Название*
          </Title>
          <Text type="secondary">От 2 до 20 символов</Text>
          <Form.Item
            name="name"
            shouldUpdate={true}
            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || (value.length >= 2 && value.length <= 20)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Название должно быть от 3 до 20 символов')
                  );
                },
              }),
            ]}
          >
            <Input
              ref={inputRef}
              placeholder="Название"
              type="text"
              size="large"
              style={{ marginTop: '10px' }}
            />
          </Form.Item>
        </div>

        <div style={{ marginTop: 40 }}>
          <Title style={{ marginBottom: '0' }} level={5}>
            <ApartmentOutlined /> Цвет плашки
          </Title>
          <Text type="secondary">
            Для удобства и красоты, чтобы новости было легче различать в
            админ-панели
          </Text>
          <Form.Item
            name="color"
            shouldUpdate={true}

            rules={[
              {
                required: true,
                message: 'Обязательное поле',
              },
            ]}
          >
            <Radio.Group style={{marginTop: 20}}>
              <Radio value="magenta"><Tag color="magenta">magenta</Tag></Radio>
              <Radio value="red"><Tag color="red">red</Tag></Radio>
              <Radio value="volcano"><Tag color="volcano">volcano</Tag></Radio>
              <Radio value="orange"><Tag color="orange">orange</Tag></Radio>
              <Radio value="gold"><Tag color="gold">gold</Tag></Radio>
              <Radio value="green"><Tag color="green">green</Tag></Radio>
              <Radio value="cyan"><Tag color="cyan">cyan</Tag></Radio>
              <Radio value="blue"><Tag color="blue">blue</Tag></Radio>
              <Radio value="geekblue"><Tag color="geekblue">geekblue</Tag></Radio>
              <Radio value="purple"><Tag color="purple">purple</Tag></Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Button loading={loading} type="primary" size="large" htmlType="submit" style={{marginTop: 20}}>
          Добавить категорию
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

export default NewsCategoryForm;
