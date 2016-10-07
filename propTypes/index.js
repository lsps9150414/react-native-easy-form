import { View/* , Text */ } from 'react-native';

import { PropTypes } from 'react';

export const formToFieldPropTypes = {
  theme: PropTypes.shape({
    activeColor: PropTypes.string,
    disabledColor: PropTypes.string,
    textColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    disabledTextColor: PropTypes.string,
  }),
  baseGridHeight: PropTypes.number,
  labelContainerStyles: View.propTypes.style,
  inputContainerStyles: View.propTypes.style,
};

export const formPropTypes = {
  ...formToFieldPropTypes,
  formData: PropTypes.object,
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
  formData: PropTypes.object.isRequired,
};
