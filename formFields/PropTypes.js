import { PropTypes } from 'react';

export const formFieldPropTypes = {
  onValueChange: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export const formFieldContextTypes = {
  handleValueChange: PropTypes.func.isRequired,
};
