import React, { useState } from 'react';
import {CryptoActivity, NewsCategory, NewsPost, PromoBanner} from '@prisma/client';
import { Card, Empty, message, Pagination } from 'antd';
import CardGrid from '@/shared/ui/CardGrid';
import fetchPosts from '@/app/servises/news/get-all';
import usePostFilters from '@/shared/hooks/usePostFilters';
import PostCard from '@/entities/PostCard';
import removePost from '@/app/servises/news/remove';
import FilterPostsPanel from "@/features/FilterPostsPanel";
import {SearchPostParams} from "@/app/servises/news/types";
import fetchPromoBanners from "@/app/servises/promo-banners/get-all";
import PromoBannerCard from "@/entities/PromoBannerCard";
import setMainPromoBanner from "@/app/servises/promo-banners/set-main";
import removePromoBanner from "@/app/servises/promo-banners/remove";

type NewsFeedProps = {
  banners: PromoBanner[];
  total: number;
  token: string;
};

const PromoBannersFeed = (props: NewsFeedProps) => {
  const { banners, total, token } = props;

  const [currentBanners, setCurrentBanners] = useState(banners);
  const [currentTotal, setCurrentTotal] = useState(total);

  const [isLoading, setIsLoading] = useState(false);

  const { filters, setFilters } = usePostFilters();

  const handlePagination = async (page: number, pageSize: number) => {
    setIsLoading(true);

    try {
      const data = await fetchPosts(token, { ...filters, page, pageSize });

      // console.log('data', data)
      setFilters({ ...filters, page, pageSize });

      setCurrentBanners(data.promoBanners);
      setCurrentTotal(data.total);
      // setIsLoading(false);
    } catch (err) {
      message.error('Ошибка при пагинации баннеров');
      console.error('Ошибка при пагинации баннеров', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetMainBanner = async (id: string) => {
    setIsLoading(true);
    try {
      await setMainPromoBanner(token, id);
      const data = await fetchPromoBanners(token);

      setCurrentBanners(data.promoBanners);
      setCurrentTotal(data.total);
      // setIsLoading(false);
    } catch (err) {
      message.error('Ошибка при изменении статуса баннера');
      console.error('Ошибка при изменении статуса баннера', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveBanner = async (id: string) => {
    setIsLoading(true);
    try {
      await removePromoBanner(token, id);
      const data = await fetchPromoBanners(token);

      setCurrentBanners(data.promoBanners);
      setCurrentTotal(data.total);
      // setIsLoading(false);
    } catch (err) {
      message.error('Ошибка при удалении баннера');
      console.error('Ошибка при удалении баннера', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilteredBanners = async (params: SearchPostParams) => {
    setIsLoading(true);
    try {
      const data = await fetchPromoBanners(token, params);

      setCurrentBanners(data.promoBanners);
      setCurrentTotal(data.total);
      // setIsLoading(false);
    } catch (err) {
      message.error('Ошибка при фильтрации баннеров');
      console.error('Ошибка при фильтрации баннеров', err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardGrid>
      {/*<FilterPostsPanel
        token={token}
        setCurrentPosts={setCurrentBanners}
        setCurrentTotal={setCurrentTotal}
        setIsLoading={setIsLoading}
        fetchFilteredPosts={fetchFilteredBanners}
      />*/}
      <div></div>
      {currentBanners.length > 0 ? (
        <>
          {currentBanners.map((banner) => (
            <PromoBannerCard
              entityName={'баннер'}
              updateUrl={'promo-banners/update'}
              key={banner.id}
              id={banner.id}
              isMain={banner.is_main}
              imageUrl={banner.image}
              title={banner.title}
              description={banner.description}
              createdAt={banner.created_at}
              updatedAt={banner.updated_at}
              handleRemove={() => handleRemoveBanner(banner.id)}
              handleSetMainBanner={() => handleSetMainBanner(banner.id)}
              isLoading={isLoading}
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

export default PromoBannersFeed;
