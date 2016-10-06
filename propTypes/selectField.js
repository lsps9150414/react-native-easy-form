import { PropTypes } from 'react';

import { formToFieldPropTypes } from './index';

export const optionContextTypes = {
  ...formToFieldPropTypes,
  selectedValues: PropTypes.object.isRequired,
  handleOnPress: PropTypes.func.isRequired,
};
