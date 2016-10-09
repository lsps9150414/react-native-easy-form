import { PropTypes } from 'react';

import { formToFieldPropTypes } from './index';

export const datePickerPropTypes = {
  ...formToFieldPropTypes,
  cancelBtnText: PropTypes.string,  // iOS only
  confirmBtnText: PropTypes.string, // iOS only
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
};
