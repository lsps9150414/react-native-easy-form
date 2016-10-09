import { PropTypes } from 'react';
import { View } from 'react-native';

import { formFieldPropTypes, formToFieldPropTypes } from './index';

export const selectPropTypes = {
  ...formFieldPropTypes,
  multipleSelections: PropTypes.bool,
  grid: PropTypes.bool,
  numberOfItemsInOneRow: PropTypes.number,
  separatorStyle: View.propTypes.style,
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
