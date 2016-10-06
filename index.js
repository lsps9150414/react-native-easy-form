import React from 'react';
import {
  View,
} from 'react-native';
import { formFieldContextTypes, formPropTypes } from './propTypes';

import TextInputField from './formFields/TextInputField';
import SelectField from './formFields/SelectField';
import SelectOption from './formFields/SelectOption';
import Seperator from './components/Separator';

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
      formData: this.props.formData || {},
    };
  }
  getChildContext = () => ({
    formData: this.state.formData,
    handleValueChange: this.handleFormFieldValueChange,
    labelContainerStyles: this.props.labelContainerStyles,
    inputContainerStyles: this.props.inputContainerStyles,
    theme: this.props.theme,
    baseGridHeight: this.props.baseGridHeight,
  })

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
EasyForm.SelectField = SelectField;
EasyForm.SelectOption = SelectOption;
EasyForm.Seperator = Seperator;
