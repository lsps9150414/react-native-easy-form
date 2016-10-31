import 'moment/locale/zh-tw';

import {
  DatePickerAndroid,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {
  Component,
} from 'react';
import { dateFieldStyles, formFieldStyles } from '../../styles';

import { datePickerComponentPropTypes } from '../../propTypes/dateField';
import moment from 'moment';

const propTypes = {
  ...datePickerComponentPropTypes,
};

const defaultProps = {};

export default class AndroidDatePicker extends Component {
  showPicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.props.date,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
      });
      if (action === DatePickerAndroid.dateSetAction) {
        this.props.onDateChange(new Date(year, month, day));
      }
    } catch ({ code, message }) {
      console.warn('Error');
    }
  }

  render() {
    const momentDate = moment(this.props.date);
    momentDate.locale('zh-tw');
    return (
      <TouchableOpacity
        style={[dateFieldStyles.dateTextContainer]}
        onPress={this.showPicker}
      >
        <Text
          style={[formFieldStyles.inputText]}
        >
          {momentDate.format('Y / M / D  (ddd)')}
        </Text>
      </TouchableOpacity>
    );
  }

}

AndroidDatePicker.propTypes = propTypes;
AndroidDatePicker.defaultProps = defaultProps;
