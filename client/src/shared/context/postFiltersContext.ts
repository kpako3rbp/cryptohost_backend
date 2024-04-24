import { createContext } from 'react';
import { SearchNewsParams } from '../../app/servises/posts/types';

type FiltersContextType = {
  filters: SearchNewsParams;
  setFilters: (filters: SearchNewsParams) => void;
};

const PostFiltersContext = createContext<FiltersContextType>({
  filters: {},
  setFilters: () => {},
});

export default PostFiltersContext;
