import React, {
  PropTypes,
} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { formFieldContextTypes, formFieldPropTypes } from '../propTypes';

import { formFieldStyles } from '../styles';

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
    return (
      <View style={[formFieldStyles.fieldGroup]}>
        <View style={[formFieldStyles.labelContainer, this.context.labelContainerStyles]}>
          <Text>{this.props.title}</Text>
        </View>
        <View style={[formFieldStyles.inputContainer, this.context.inputContainerStyles]}>
          <TextInput
            style={[styles.textInput]}
            onChangeText={this.handleValueChange}
            {...this.props}
          />
        </View>
      </View>
    );
  }
}

TextInputField.propTypes = {
  ...formFieldPropTypes,
  ...TextInput.propTypes,
};

TextInputField.defaultProps = {};

TextInputField.contextTypes = {
  ...formFieldContextTypes,
};
