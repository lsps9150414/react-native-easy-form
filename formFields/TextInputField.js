import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { formFieldContextTypes, formFieldPropTypes } from '../propTypes';

import Label from './Label';
import React from 'react';
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
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
    this.context.handleValueChange(this.props.name, value);
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
          <TextInput
            style={[formFieldStyles.inputText, styles.textInput]}
            underlineColorAndroid={'transparent'}
            onChangeText={this.handleValueChange}
            {...this.props}
            value={this.context.formData[this.props.name]}
          />
        </View>
      </View>
    );
  }
}

TextInputField.propTypes = propTypes;
TextInputField.defaultProps = defaultProps;
TextInputField.contextTypes = contextTypes;
