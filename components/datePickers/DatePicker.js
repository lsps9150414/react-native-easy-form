import React, {
  Component,
} from 'react';

import DatePicker from 'material-ui/DatePicker';
import { datePickerComponentPropTypes } from '../../propTypes/dateField';
import moment from 'moment';

const propTypes = {
  ...datePickerComponentPropTypes,
};

const defaultProps = {};

export default class MyComponent extends Component {
  handleDateChange = (event, date) => {
    this.props.onDateChange(date);
  }
  render() {
    const momentDate = moment(this.props.date);
    momentDate.locale('zh-tw');
    return (
      <DatePicker
        hintText={momentDate.format('Y / M / D  (ddd)')}
        value={this.props.date}
        onChange={this.handleDateChange}
      />
    );
  }

}

MyComponent.propTypes = propTypes;
MyComponent.defaultProps = defaultProps;
