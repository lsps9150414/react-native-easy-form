import { StyleSheet } from 'react-native';

export const formFieldStyles = StyleSheet.create({
  fieldGroup: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
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
