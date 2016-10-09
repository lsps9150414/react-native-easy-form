import { formFieldContextTypes, formPropTypes } from './propTypes';

import DateField from './formFields/DateField';
import React from 'react';
import SelectField from './formFields/SelectField';
import SelectOption from './formFields/SelectOption';
import Separator from './components/separators/Separator';
import TextInputField from './formFields/TextInputField';
import TimeRangeField from './formFields/TimeRangeField';
import {
  View,
} from 'react-native';

const propTypes = {
  ...formPropTypes,
};

const defaultProps = {};

const childContextTypes = {
  ...formFieldContextTypes,
};

export default class EasyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: props.formData || {},
    };
  }
  getChildContext = () => ({
    formData: this.state.formData,
    handleValueChange: this.handleFormFieldValueChange,
    labelContainerStyle: this.props.labelContainerStyle,
    inputContainerStyle: this.props.inputContainerStyle,
    theme: this.props.theme,
    baseGridHeight: this.props.baseGridHeight,
  })

  componentWillReceiveProps(nextProps) {
    if (nextProps.formData !== this.props.formData) {
      this.setState({ formData: nextProps.formData });
    }
  }

  handleFormFieldValueChange = (fieldName, value) => {
    this.setState(
      (previousState) => ({ formData: { ...previousState.formData, [fieldName]: value } }),
      () => { this.props.onFormValueChange(this.state.formData); }
    );
  }
  render() {
    return (
      <View>
        {this.props.children}
      </View>
    );
  }
}

EasyForm.propTypes = propTypes;
EasyForm.defaultProps = defaultProps;
EasyForm.childContextTypes = childContextTypes;

EasyForm.TextInputField = TextInputField;
EasyForm.DateField = DateField;
EasyForm.TimeRangeField = TimeRangeField;
EasyForm.SelectField = SelectField;
EasyForm.SelectOption = SelectOption;
EasyForm.Separator = Separator;
