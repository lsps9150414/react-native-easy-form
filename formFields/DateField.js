import React, {
  Component,
  PropTypes,
} from 'react';
import { formFieldContextTypes, formFieldPropTypes } from '../propTypes';

import Label from './Label';
import {
  View,
  TouchableHighlight,
} from 'react-native';
import { formFieldStyles } from '../styles';

const propTypes = {
  ...formFieldPropTypes,
};

const defaultProps = {};

const contextTypes = {
  ...formFieldContextTypes,
};

export default class DateField extends Component {

  render() {
    return (
      <View
        style={[
          formFieldStyles.fieldGroup,
          Boolean(this.context.baseGridHeight) && { height: this.context.baseGridHeight },
        ]}
      >
        <Label title={this.props.title} labelContainerStyles={this.context.labelContainerStyles} />
        <View style={[formFieldStyles.inputContainer, this.context.inputContainerStyles]}>
          <TouchableHighlight>

          </TouchableHighlight>
          <TextInput
            style={[formFieldStyles.inputText]}
            onChangeText={this.handleValueChange}
            {...{ ...this.props, value: this.context.formData[this.props.name] }}
          />
        </View>
      </View>
    );
  }

}

DateField.propTypes = propTypes;
DateField.defaultProps = defaultProps;
DateField.contextTypes = contextTypes;
