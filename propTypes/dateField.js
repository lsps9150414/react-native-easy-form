import { PropTypes } from 'react';

export const datePickerPropTypes = {
  cancelBtnText: PropTypes.string,  // iOS only
  confirmBtnText: PropTypes.string, // iOS only
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
};
