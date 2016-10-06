import React from 'react';
import {
  View,
} from 'react-native';
import { formFieldContextTypes, formPropTypes } from './propTypes';

import TextInputField from './formFields/TextInputField';
import GridSelectField from './formFields/GridSelectField';
import SelectOption from './formFields/SelectOption';

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
      formValues: {},
    };
  }
  getChildContext = () => ({
    handleValueChange: this.handleFormFieldValueChange,
    labelContainerStyles: this.props.labelContainerStyles,
    inputContainerStyles: this.props.inputContainerStyles,
    theme: this.props.theme,
  })

  handleFormFieldValueChange = (fieldName, value) => {
    this.setState(
      { formValues: { ...this.state.formValues, [fieldName]: value } },
      () => { this.props.onFormValueChange(this.state.formValues); }
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
EasyForm.GridSelectField = GridSelectField;
EasyForm.SelectOption = SelectOption;
