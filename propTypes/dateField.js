import { PropTypes } from 'react';

import { formToFieldPropTypes } from './index';

export const datePickerPropTypes = {
  ...formToFieldPropTypes,
  cancelBtnText: PropTypes.string,
  confirmBtnText: PropTypes.string,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
};
