import React, {
  PropTypes,
} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { formFieldContextTypes, formFieldPropTypes } from './PropTypes';

import { formFieldStyles } from '../styles';

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    backgroundColor: 'yellow',
  },
});

export default class TextInputField extends React.Component {
  handleValueChange = (value) => {
    this.context.handleValueChange(this.props.name, value);
  }
  render() {
    return (
      <View style={[formFieldStyles.fieldGroup]}>
        <View style={[formFieldStyles.labelContainer]}>
          <Text>{this.props.title}</Text>
        </View>
        <View style={[formFieldStyles.inputContainer]}>
          <TextInput
            style={[styles.textInput]}
            onChangeText={this.handleValueChange}
          />
        </View>
      </View>
    );
  }
}

TextInputField.propTypes = {
  ...formFieldPropTypes,
  title: PropTypes.string.isRequired,
};

TextInputField.contextTypes = {
  ...formFieldContextTypes,
  color: React.PropTypes.string
};

TextInputField.defaultProps = {};
