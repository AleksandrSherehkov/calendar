import useTasksStore from '@/store/zustandStore/useTaskStore';
import {
  InputFormStyled,
  SearchIconStyled,
  WrapperSearchStyled,
} from './SearchFilter.styled';

export const SearchFilter = () => {
  const setFilterQuery = useTasksStore.use.setFilterQuery();
  const filterQuery = useTasksStore.use.filterQuery();
  return (
    <WrapperSearchStyled>
      <InputFormStyled
        type="text"
        name="search"
        placeholder="Фільтрація"
        value={filterQuery}
        onChange={e => setFilterQuery(e.target.value)}
      />
      <SearchIconStyled />
    </WrapperSearchStyled>
  );
};
