import React from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Flex,
  Grid,
  Input,
  Row,
  Select,
  Space,
  theme,
} from 'antd';
import Link from 'next/link';
import { SearchOutlined } from '@ant-design/icons';

type Props = {
  route?: string;
  search?: boolean;
  filters?: string[];
  categories?: string[];
};

const FilterPanel = (props: Props) => {
  const { route, search = false, filters, categories = [] } = props;
  const {
    token: { colorBorder },
  } = theme.useToken();

  return (
    <Collapse
      size="large"
      // defaultActiveKey={['1']}
      style={{
        backgroundColor: 'var(--light-blue-color)'
      }}
      items={[
        {
          key: '1',
          label: 'Панель фильтров',
          children: (
            <div style={{ borderColor: colorBorder }}>
              <Row justify="space-between" align="middle" gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Space.Compact style={{ minWidth: '100%' }}>
                    <Input placeholder="Поиск по заголовку" />
                    <Button icon={<SearchOutlined />}></Button>
                  </Space.Compact>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Select
                    style={{ minWidth: '100%' }}
                    defaultValue="createdAt"
                    allowClear
                    options={[
                      { value: 'createdAt', label: 'По дате добавления' },
                      { value: 'updatedAt', label: 'По дате редактирования' },
                      { value: 'title', label: 'По заголовку' },
                      { value: 'category', label: 'По категории' },
                    ]}
                  />
                </Col>
              </Row>
              <Divider />
              <Select
                style={{ minWidth: '100%' }}
                mode="multiple"
                placeholder="Категории"
                defaultValue={[]}
                onChange={() => {}}
                options={[
                  {
                    label: 'Майнинг',
                    value: 'mining',
                    desc: 'Майнинг',
                  },
                  {
                    label: 'Пресс-релизы',
                    value: 'usa',
                    desc: 'Пресс-релизы',
                  },
                  {
                    label: 'Криптовалюта',
                    value: 'japan',
                    desc: 'Криптовалюта',
                  },
                  {
                    label: 'Активности',
                    value: 'korea',
                    desc: 'Активности',
                  },
                ]}
                optionRender={(option) => (
                  <Space>
                    <span role="img" aria-label={option.data.label}>
                      {option.data.emoji}
                    </span>
                    {option.data.desc}
                  </Space>
                )}
              />
            </div>
          ),
        },
      ]}
    />
  );
};

export default FilterPanel;
