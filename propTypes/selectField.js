import { PropTypes } from 'react';

import { formToFieldPropTypes } from './index';

export const optionContextTypes = {
  ...formToFieldPropTypes,
  selectedOptions: PropTypes.object.isRequired,
  handleOnPress: PropTypes.func.isRequired,
};
