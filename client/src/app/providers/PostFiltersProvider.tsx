import { SearchNewsParams } from '../servises/posts/types';
import { useState } from 'react';
import PostFiltersContext from '@/shared/context/postFiltersContext';

type Props = {
  children: React.ReactNode[];
};

const PostFiltersProvider = (props: Props) => {
  const { children } = props;
  const [filters, setFilters] = useState<SearchNewsParams>({});

  return (
    <PostFiltersContext.Provider value={{ filters, setFilters }}>
      {children}
    </PostFiltersContext.Provider>
  );
};

export default PostFiltersProvider;
