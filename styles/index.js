import {
  ACTIVE_COLOR,
  ACTIVE_TEXT_COLOR,
  DISABLED_COLOR,
  DISABLED_TEXT_COLOR,
  INPUT_BG_COLOR,
  LABEL_BG_COLOR,
  TEXT_COLOR,
} from '../constants/color';

import { BASE_GRID_HEIGHT } from '../constants/layout';
import { StyleSheet } from 'react-native';

export const formFieldStyles = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'row',
    height: BASE_GRID_HEIGHT,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: LABEL_BG_COLOR,
  },
  inputContainer: {
    flex: 3,
    justifyContent: 'center',
    backgroundColor: INPUT_BG_COLOR,
  },
  label: {
    textAlign: 'center',
    color: TEXT_COLOR,
  },
  inputText: {
    textAlign: 'center',
    color: TEXT_COLOR,
  },
});

export const dateFieldStyles = StyleSheet.create({
  dateTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export const SelectOptionStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  selected: {
    backgroundColor: ACTIVE_COLOR,
  },
  disabled: {
    backgroundColor: DISABLED_COLOR,
  },
  selectedText: {
    color: ACTIVE_TEXT_COLOR,
  },
  disabledText: {
    color: DISABLED_TEXT_COLOR,
  },
});
