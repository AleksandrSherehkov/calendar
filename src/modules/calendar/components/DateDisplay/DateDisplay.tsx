import { TextDataStyled } from './DateDisplay.styled';
import { format, getMonth } from 'date-fns';
import useTasksStore from '@/store/zustandStore/useTaskStore';
import { MONTHS_IN_NOMINATIVE_CASE } from '../../constants/dataConstants';
import { DISPLAY_MODE_DAY } from '../../constants/constants';
import { uk } from 'date-fns/locale';

export const DateDisplay = () => {
  const displayMode = useTasksStore.use.displayMode();
  const selectedDate = useTasksStore.use.selectedDate();
  const month = getMonth(selectedDate);
  const monthName = MONTHS_IN_NOMINATIVE_CASE[month];

  return (
    <TextDataStyled>
      {displayMode === DISPLAY_MODE_DAY
        ? format(selectedDate, 'd MMMM yyyy', { locale: uk })
        : `${monthName} ${format(selectedDate, 'yyyy', { locale: uk })}`}
    </TextDataStyled>
  );
};
