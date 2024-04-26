import { createContext } from 'react';
import { SearchPostParams } from '@/app/servises/posts/types';

type FiltersContextType = {
  filters: SearchPostParams;
  setFilters: (filters: SearchPostParams) => void;
};

const PostFiltersContext = createContext<FiltersContextType>({
  filters: {},
  setFilters: () => {},
});

export default PostFiltersContext;
