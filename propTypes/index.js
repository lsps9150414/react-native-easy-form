import {
  Text,
  View,
} from 'react-native';

import { PropTypes } from 'react';

export const formToFieldPropTypes = {
  labelContainerStyles: View.propTypes.style,
  inputContainerStyles: View.propTypes.style,
};

export const formPropTypes = {
  ...formToFieldPropTypes,
  onFormValueChange: PropTypes.func.isRequired,
};

export const formFieldPropTypes = {
  onValueChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export const formFieldContextTypes = {
  ...formToFieldPropTypes,
  handleValueChange: PropTypes.func.isRequired,
};
