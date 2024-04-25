import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Collapse,
  Divider,
  Input,
  message,
  Row,
  Select,
  Space,
  theme,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { NewsCategory, NewsPost } from '@prisma/client';
import { selectSortByOptions } from './config';
import usePostFilters from '@/shared/hooks/usePostFilters';
import fetchPosts from '@/app/servises/posts/get-all';
import { SearchNewsParams } from '@/app/servises/posts/types';

const { Search } = Input;

type NewsPostWithCategory = NewsPost & {
  category: NewsCategory;
};

type Props = {
  token: string;
  categories: NewsCategory[];
  setCurrentPosts: (posts: NewsPostWithCategory[]) => void;
  setCurrentTotal: (total: number) => void;
  setIsLoading: (state: boolean) => void;
};

const FilterPosts = (props: Props) => {
  const { token, categories, setCurrentPosts, setCurrentTotal, setIsLoading } =
    props;
  const {
    token: { colorBorder },
  } = theme.useToken();

  const initialFiltersState = {
    page: 1,
    pageSize: 10,
    categoryIds: [],
    searchQuery: '',
    sortField: 'published_at',
    sortOrder: 'desc',
  } as SearchNewsParams;

  const [filtersTouched, setFiltersTouched] = useState(false);
  const [searchQueryValue, setSearchQueryValue] = useState(
    initialFiltersState.searchQuery
  );
  const { filters, setFilters } = usePostFilters();

  const fetchFilteredPosts = async (params: SearchNewsParams) => {
    setIsLoading(true);
    try {
      const data = await fetchPosts(token, params);

      setCurrentPosts(data.posts);
      setCurrentTotal(data.total);
      // setIsLoading(false);
    } catch (err) {
      message.error('Ошибка при фильтрации постов');
      console.error('Ошибка при фильтрации постов', err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategory = (value: string[]) => {
    setFilters({
      ...filters,
      page: initialFiltersState.page,
      pageSize: initialFiltersState.pageSize,
      categoryIds: value,
    });
    setFiltersTouched(true);
  };

  const handleSortBy = (value: string) => {
    const sortFieldValue = value.split(' ')[0] as SearchNewsParams['sortField'];
    const sortOrderValue = value.split(' ')[1] as SearchNewsParams['sortOrder'];
    setFilters({
      ...filters,
      page: initialFiltersState.page,
      pageSize: initialFiltersState.pageSize,
      sortField: sortFieldValue,
      sortOrder: sortOrderValue,
    });
    setFiltersTouched(true);
  };

  const handleSortSearchQuery = (value: string) => {
    setFilters({
      ...filters,
      page: initialFiltersState.page,
      pageSize: initialFiltersState.pageSize,
      searchQuery: value,
    });
    setFiltersTouched(true);
  };

  const handleResetFilters = async () => {
    setFilters(initialFiltersState);
    setFiltersTouched(false);
    setSearchQueryValue(initialFiltersState.searchQuery);
    await fetchFilteredPosts(initialFiltersState);
  };

  useEffect(() => {
    setFilters(initialFiltersState);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (filtersTouched) {
        await fetchFilteredPosts(filters);
      }
    };

    fetchData();
  }, [
    filters.categoryIds,
    filters.searchQuery,
    filters.sortField,
    filters.sortOrder,
  ]);

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
                      // onChange={(e) => handleSortSearchQuery(e.target.value)}
                      onSearch={handleSortSearchQuery}
                      onChange={(e) => setSearchQueryValue(e.target.value)}
                      value={searchQueryValue}
                      size="large"
                      placeholder="Поиск по заголовку"
                    />
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
