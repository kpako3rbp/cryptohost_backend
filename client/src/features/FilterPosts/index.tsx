import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
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
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { SearchNewsParams } from '../../app/servises/posts/types';
import { NewsCategory } from '@prisma/client';
import { selectSortByOptions } from './config';

const { Search } = Input;

type Props = {
  categories: NewsCategory[];
  callback: (params: SearchNewsParams) => void;
  resetPagination: () => void;
};

const FilterPosts = (props: Props) => {
  const { callback, categories, resetPagination } = props;
  const {
    token: { colorBorder },
  } = theme.useToken();

  const initialFiltersState = {
    page: 1,
    pageSize: 10,
    categoryIds: [],
    searchQuery: '',
    sortField: 'published_at',
    sortOrder: 'desc', // TODO разобраться с алфавитом и поиском по имени категории
  } as SearchNewsParams;

  const [filters, setFilters] = useState<SearchNewsParams>({
    ...initialFiltersState,
  });
  const [filtersTouched, setFiltersTouched] = useState(false);

  // TODO сбрасывать пагинацию при сортировках
  useEffect(() => {
    callback(filters);
  }, [filters]);

  console.log('FILTERS!!!', filters);

  const handleCategory = (value: string[]) => {
    setFilters({ ...filters, categoryIds: value });
    setFiltersTouched(true);
    resetPagination();
  };

  const handleSortBy = (value: string) => {
    const sortFieldValue = value.split(' ')[0] as SearchNewsParams['sortField'];
    const sortOrderValue = value.split(' ')[1] as SearchNewsParams['sortOrder'];
    setFilters({ ...filters, sortField: sortFieldValue, sortOrder: sortOrderValue });
    setFiltersTouched(true);
    resetPagination();
  };

  const handleSortSearchQuery = (value: string) => {
    // console.log('value', value);
    setFilters({ ...filters, searchQuery: value });
    setFiltersTouched(true);
    resetPagination();
  };

  const handleResetFilters = () => {
    setFilters(initialFiltersState);
    setFiltersTouched(false);
    resetPagination();
  };

  const selectCategoriesOptions = categories?.reduce<
    { value: string; label: string; desc: string }[]
  >((acc, category) => {
    acc.push({
      value: category.id,
      label: category.name,
      desc: category.name,
    });
    return acc;
  }, []);

  return (
    <Collapse
      size="large"
      defaultActiveKey={['1']}
      style={{
        backgroundColor: 'var(--light-blue-color)',
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
                    <Search
                      onChange={(e) => handleSortSearchQuery(e.target.value)}
                      value={filters.searchQuery}
                      size="large"
                      placeholder="Поиск по заголовку"
                    />
                    {/*<Button size="large" icon={<SearchOutlined />}></Button>*/}
                  </Space.Compact>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Select
                    size="large"
                    style={{ minWidth: '100%' }}
                    defaultValue={`${initialFiltersState.sortField} ${initialFiltersState.sortOrder}`}
                    value={`${filters.sortField} ${filters.sortOrder}`}
                    allowClear
                    options={selectSortByOptions}
                    onChange={handleSortBy}
                  />
                </Col>
              </Row>
              <Select
                size="large"
                style={{ minWidth: '100%', marginTop: '20px' }}
                mode="multiple"
                placeholder="Категории"
                defaultValue={initialFiltersState.categoryIds}
                value={filters.categoryIds}
                onChange={handleCategory}
                options={selectCategoriesOptions}
                optionRender={(option) => (
                  <Space>
                    <span role="img" aria-label={option.data.label}>
                      {option.data.emoji}
                    </span>
                    {option.data.desc}
                  </Space>
                )}
              />
              {filtersTouched && (
                <>
                  <Divider />
                  <Button
                    size="large"
                    icon={<CloseOutlined />}
                    onClick={handleResetFilters}
                  >
                    Сбросить фильтры
                  </Button>
                </>
              )}
            </div>
          ),
        },
      ]}
    />
  );
};

export default FilterPosts;
