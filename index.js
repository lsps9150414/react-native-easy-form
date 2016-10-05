import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
} from 'react-native';
import { formFieldContextTypes, formPropTypes } from './propTypes';

import TextInputField from './formFields/TextInputField';

export default class EasyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
    };

    console.log(formFieldContextTypes);
  }

  getChildContext = () => ({
    handleValueChange: this.getFormFieldValue,
    labelContainerStyles: this.props.labelContainerStyles,
    inputContainerStyles: this.props.inputContainerStyles,
  })

  getFormFieldValue = (fieldName, value) => {
    this.setState(
      { formValues: { ...this.state.formValues, [fieldName]: value } },
      () => { this.props.onFormValueChange(this.state.formValues); }
    );
  }
  render() {
    return (
      <View>
        <Text>EasyForm</Text>
        {this.props.children}
      </View>
    );
  }
}

EasyForm.propTypes = {
  ...formPropTypes,
};

EasyForm.defaultProps = {};

EasyForm.childContextTypes = {
  ...formFieldContextTypes,
};

EasyForm.TextInputField = TextInputField;
