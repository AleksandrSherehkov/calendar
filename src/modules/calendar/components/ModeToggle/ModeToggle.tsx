import { Button } from '@/shared/components/Button/Button';
import { WraperButtonStyled } from './ModeToggle.styled';
import useTasksStore from '@/store/zustandStore/useTaskStore';
import {
  DISPLAY_MODE_DAY,
  DISPLAY_MODE_MONTH,
} from '../../constants/constants';

export const ModeToggle = () => {
  const setDisplayMode = useTasksStore.use.setDisplayMode();
  const resetToToday = useTasksStore.use.resetToToday();
  const displayMode = useTasksStore.use.displayMode();

  const handleMonthMode = () => {
    resetToToday();
    setDisplayMode(DISPLAY_MODE_MONTH);
  };

  const handleDayMode = () => {
    resetToToday();
    setDisplayMode(DISPLAY_MODE_DAY);
  };
  return (
    <WraperButtonStyled>
      <Button
        onClick={handleMonthMode}
        isActive={displayMode === DISPLAY_MODE_MONTH}
        text="Місяць"
        variant="active"
      />
      <Button
        onClick={handleDayMode}
        isActive={displayMode === DISPLAY_MODE_DAY}
        text="День"
        variant="active"
      />
    </WraperButtonStyled>
  );
};
