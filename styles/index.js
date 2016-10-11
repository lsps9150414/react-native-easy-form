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
    backgroundColor: '#ddd',
  },
  inputContainer: {
    flex: 3,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    textAlign: 'center',
    color: '#000',
  },
  inputText: {
    textAlign: 'center',
    color: '#000',
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
    backgroundColor: '#666',
  },
  selectedText: {
    color: '#fff',
  },
  disabled: {
    backgroundColor: '#aaa',
  },
  disabledText: {
    color: '#ddd',
  },
});
