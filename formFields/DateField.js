import React, {
  Component,
} from 'react';
import { formFieldContextTypes, formFieldPropTypes } from '../propTypes';

import DatePicker from '../components/datePickers/DatePicker';
import Label from './Label';
import {
  View,
} from 'react-native';
import { datePickerPropTypes } from '../propTypes/dateField';
import { formFieldStyles } from '../styles';

const propTypes = {
  ...formFieldPropTypes,
  ...datePickerPropTypes,
};

const defaultProps = {};

const contextTypes = {
  ...formFieldContextTypes,
};

export default class DateField extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      date: context.formData[props.name] || new Date(),
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.updateDateFromFormData(nextContext.formData[this.props.name]);
  }

  updateDateFromFormData = (date) => {
    if (Boolean(date)) {
      this.setState({ date });
    } else {
      this.setState({ date: new Date() });
    }
  }

  handleValueChange = (value) => {
    this.setState({ date: value },
      this.handleStateChange
    );
  }
  handleStateChange = () => {
    if (this.props.onValueChange) {
      this.props.onValueChange(this.props.name, this.state.date);
    }
    this.context.handleValueChange(this.props.name, this.state.date);
  }
  render() {
    return (
      <View
        style={[
          formFieldStyles.fieldContainer,
          Boolean(this.context.baseGridHeight) && { height: this.context.baseGridHeight },
        ]}
      >
        <Label
          title={this.props.title}
          containerStyle={this.context.labelContainerStyle}
          textStyle={this.context.labelTextStyle}
        />
        <View style={[formFieldStyles.inputContainer, this.context.inputContainerStyle]}>
          <DatePicker
            date={this.state.date}
            onDateChange={this.handleValueChange}
            theme={this.context.theme}
            cancelBtnText={this.props.cancelBtnText}
            confirmBtnText={this.props.confirmBtnText}
            maxDate={this.props.maxDate}
            minDate={this.props.minDate}
          />
        </View>
      </View>
    );
  }

}

DateField.propTypes = propTypes;
DateField.defaultProps = defaultProps;
DateField.contextTypes = contextTypes;
