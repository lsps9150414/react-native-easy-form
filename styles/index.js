import { BASE_GRID_HEIGHT } from '../constants/layout';
import { StyleSheet } from 'react-native';

export const formFieldStyles = StyleSheet.create({
  fieldGroup: {
    flexDirection: 'row',
    height: BASE_GRID_HEIGHT,
  },
  labelContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  label: {
    textAlign: 'center',
    color: '#000',
  },
  inputContainer: {
    flex: 3,
  },
  inputText: {
    color: '#000',
  },
});

export const dateFieldStyles = StyleSheet.create({
  dateTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
