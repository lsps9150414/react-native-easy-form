import { BASE_GRID_HEIGHT } from '../constants/layout';
import { StyleSheet } from 'react-native';

export const formFieldStyles = StyleSheet.create({
  fieldGroup: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: BASE_GRID_HEIGHT,
  },
  labelContainer: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'center',
  },
  inputContainer: {
    flex: 3,
  },
});
