import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
} from 'react-native';

import TextInputField from './formFields/TextInputField';

export default class EasyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {},
    };
  }

  getChildContext = () => ({
    handleValueChange: this.getFormFieldValue,
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
  onFormValueChange: PropTypes.func.isRequired,
  formStyles: View.propTypes.style,
};

EasyForm.defaultProps = {};

EasyForm.childContextTypes = {
  handleValueChange: PropTypes.func.isRequired,
};

EasyForm.TextInputField = TextInputField;
