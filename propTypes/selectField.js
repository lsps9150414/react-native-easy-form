import { Text, View } from 'react-native';
import { formFieldPropTypes, formToFieldPropTypes } from './index';

import { PropTypes } from 'react';

export const selectPropTypes = {
  ...formFieldPropTypes,
  multipleSelections: PropTypes.bool,
  grid: PropTypes.bool,
  numberOfItemsInOneRow: PropTypes.number,
  separatorStyle: View.propTypes.style,
  optionTextStyle: Text.propTypes.style,
};

export const selectOptionPropTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  text: PropTypes.string,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  textStyle: Text.propTypes.style,
};

export const selectDefaultProps = {
  multipleSelections: false,
  grid: false,
  numberOfItemsInOneRow: 5,
};

export const optionContextTypes = {
  ...formToFieldPropTypes,
  handleOnPress: PropTypes.func.isRequired,
};
