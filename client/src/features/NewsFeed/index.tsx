import React, { useState } from 'react';
import {CryptoActivity, NewsCategory, NewsPost} from '@prisma/client';
import { Card, Empty, message, Pagination } from 'antd';
import CardGrid from '@/shared/ui/CardGrid';
import fetchPosts from '@/app/servises/news/get-all';
import usePostFilters from '@/shared/hooks/usePostFilters';
import PostCard from '@/entities/PostCard';
import removePost from '@/app/servises/news/remove';
import FilterPostsPanel from "@/features/FilterPostsPanel";
import {SearchPostParams} from "@/app/servises/news/types";

type NewsPostWithCategory = NewsPost & {
  category: NewsCategory;
};

type NewsFeedProps = {
  categories?: NewsCategory[];
  posts: NewsPostWithCategory[];
  total: number;
  token: string;
};

const NewsFeed = (props: NewsFeedProps) => {
  const { categories, posts, total, token } = props;

  const [currentPosts, setCurrentPosts] = useState(posts);
  const [currentTotal, setCurrentTotal] = useState(total);

  const [isLoading, setIsLoading] = useState(false);

  const { filters, setFilters } = usePostFilters();

  const handlePagination = async (page: number, pageSize: number) => {
    setIsLoading(true);

    try {
      const data = await fetchPosts(token, { ...filters, page, pageSize });

      // console.log('data', data)
      setFilters({ ...filters, page, pageSize });

      setCurrentPosts(data.posts);
      setCurrentTotal(data.total);
      // setIsLoading(false);
    } catch (err) {
      message.error('Ошибка при пагинации постов');
      console.error('Ошибка при пагинации постов', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePost = async (id: string) => {
    setIsLoading(true);
    try {
      await removePost(token, id);
      const data = await fetchPosts(token);

      setCurrentPosts(data.posts);
      setCurrentTotal(data.total);
      // setIsLoading(false);
    } catch (err) {
      message.error('Ошибка при удалении поста');
      console.error('Ошибка при удалении поста', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilteredPosts = async (params: SearchPostParams) => {
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

  return (
    <CardGrid>
      <FilterPostsPanel
        token={token}
        categories={categories}
        setCurrentPosts={setCurrentPosts}
        setCurrentTotal={setCurrentTotal}
        setIsLoading={setIsLoading}
        fetchFilteredPosts={fetchFilteredPosts}
      />
      {currentPosts.length > 0 ? (
        <>
          {currentPosts.map((post) => (
            <PostCard
              entityName={'новость'}
              updateUrl={'news/update'}
              key={post.id}
              id={post.id}
              slug={post.slug}
              imageUrl={post.image}
              title={post.title}
              publishedAt={post.published_at}
              updatedAt={post.updated_at}
              category={post.category}
              handleRemove={() => handleRemovePost(post.id)}
              isLoading={isLoading}
              views={post.views}
            />
          ))}
          <Pagination
            style={{ marginTop: '20px', borderRadius: '50px' }}
            total={currentTotal}
            showTotal={(total, range) => `${range[0]}-${range[1]} из ${total}`}
            defaultPageSize={10}
            // defaultCurrent={1}
            current={filters.page}
            onChange={handlePagination}
          />
        </>
      ) : (
        <Card style={{ marginTop: '10px' }}>
          <Empty />
        </Card>
      )}
    </CardGrid>
  );
};

export default NewsFeed;
