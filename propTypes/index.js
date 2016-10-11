import { View/* , Text */ } from 'react-native';

import { PropTypes } from 'react';

export const formToFieldPropTypes = {
  baseGridHeight: PropTypes.number,
  theme: PropTypes.shape({
    activeColor: PropTypes.string,
    disabledColor: PropTypes.string,
    dangerColor: PropTypes.string,
    textColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    disabledTextColor: PropTypes.string,
    separatorColor: PropTypes.string,
  }),
  labelContainerStyle: View.propTypes.style,
  inputContainerStyle: View.propTypes.style,
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
