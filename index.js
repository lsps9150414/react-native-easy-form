import { formFieldContextTypes, formPropTypes } from './propTypes';

import { BASE_GRID_HEIGHT } from './constants/layout';
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
import _ from 'lodash/lang';

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
    labelTextStyle: this.props.labelTextStyle,
    inputContainerStyle: this.props.inputContainerStyle,
    inputTextStyle: this.props.inputTextStyle,
    theme: this.props.theme,
    baseGridHeight: this.props.baseGridHeight || BASE_GRID_HEIGHT,
  })

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.formData, this.props.formData)) {
      this.setState({ formData: nextProps.formData });
    }
  }

  handleFormFieldValueChange = (fieldName, value) => {
    this.setState(
      (previousState) => ({ formData: { ...previousState.formData, [fieldName]: value } }),
      () => { this.props.onFormDataChange(this.state.formData); }
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

EasyForm.SelectField = SelectField;
EasyForm.SelectOption = SelectOption;
EasyForm.TimeRangeField = TimeRangeField;
EasyForm.DateField = DateField;
EasyForm.TextInputField = TextInputField;
EasyForm.Separator = Separator;
