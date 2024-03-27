import { ControlPanelWrapperStyled } from './ControlPanel.styled';
import {} from '../../constants/constants';

import { DateDisplay } from '../DateDisplay/DateDisplay';
import { ModeToggle } from '../ModeToggle/ModeToggle';

import { NavigationControls } from '../NavigationControls/NavigationControls';

export const ControlPanel = () => {
  return (
    <ControlPanelWrapperStyled>
      <DateDisplay />
      <ModeToggle />
      <NavigationControls />
    </ControlPanelWrapperStyled>
  );
};
