import { useContext } from 'react';
import PostFiltersContext from '../context/postFiltersContext';

export const usePostFilters = () => useContext(PostFiltersContext);

export default usePostFilters;
