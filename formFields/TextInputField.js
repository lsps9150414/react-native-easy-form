import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { formFieldContextTypes, formFieldPropTypes } from '../propTypes';

import Label from './Label';
import { formFieldStyles } from '../styles';

const propTypes = {
  ...formFieldPropTypes,
  ...TextInput.propTypes,
};
const defaultProps = {};
const contextTypes = {
  ...formFieldContextTypes,
};

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
  },
});

export default class TextInputField extends React.Component {
  handleValueChange = (value) => {
    this.context.handleValueChange(this.props.name, value);
  }
  render() {
    const value = Boolean(this.context.formData[this.props.name]) ?
      this.context.formData[this.props.name] : this.props.value;
    return (
      <View
        style={[
          formFieldStyles.fieldGroup,
          Boolean(this.context.baseGridHeight) && { height: this.context.baseGridHeight },
        ]}
      >
        <Label title={this.props.title} labelContainerStyles={this.context.labelContainerStyles} />
        <View style={[formFieldStyles.inputContainer, this.context.inputContainerStyles]}>
          <TextInput
            style={[formFieldStyles.inputText, styles.textInput]}
            onChangeText={this.handleValueChange}
            {...this.props}
            value={value}
          />
        </View>
      </View>
    );
  }
}

TextInputField.propTypes = propTypes;
TextInputField.defaultProps = defaultProps;
TextInputField.contextTypes = contextTypes;
