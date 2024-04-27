import { SearchPostParams } from '../servises/news/types';
import { useState } from 'react';
import PostFiltersContext from '@/shared/context/postFiltersContext';

type Props = {
  children: React.ReactNode[];
};

const PostFiltersProvider = (props: Props) => {
  const { children } = props;
  const [filters, setFilters] = useState<SearchPostParams>({});

  return (
    <PostFiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </PostFiltersContext.Provider>
  );
};

export default PostFiltersProvider;
