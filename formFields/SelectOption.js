import React, {
  Component,
} from 'react';
import { SelectOptionStyles, formFieldStyles } from '../styles';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { optionContextTypes, selectOptionPropTypes } from '../propTypes/selectField';

const propTypes = {
  ...selectOptionPropTypes,
};

const defaultProps = {
};

const contextTypes = {
  ...optionContextTypes,
};

export default class SelectOption extends Component {
  componentWillMount() {
    if (this.context.theme) {
      this.activeColor = this.context.theme.activeColor;
      this.activeTextColor = this.context.theme.activeTextColor;
      this.disabledColor = this.context.theme.disabledColor;
      this.disabledTextColor = this.context.theme.disabledTextColor;
    }
  }

  handleOnPress = () => {
    if (!this.props.disabled) {
      this.context.handleOnPress(String(this.props.value));
    }
  }

  render() {
    const selected = this.props.selected;
    const disabled = this.props.disabled;
    return (
      <TouchableOpacity
        onPress={this.handleOnPress}
        disabled={disabled}
        style={[{ flex: 1, flexBasis: 0 }]}
      >
        <View
          style={[
            SelectOptionStyles.container,
            selected && SelectOptionStyles.selected,
            selected && Boolean(this.activeColor) && { backgroundColor: this.activeColor },
            disabled && SelectOptionStyles.disabled,
            disabled && Boolean(this.disabledColor)
              && { backgroundColor: this.disabledColor },
          ]}
        >
          <Text
            style={[
              formFieldStyles.inputText,
              SelectOptionStyles.text,
              Boolean(this.props.textStyle) && this.props.textStyle,
              selected && SelectOptionStyles.selectedText,
              selected && Boolean(this.activeTextColor) && { color: this.activeTextColor },
              disabled && SelectOptionStyles.disabledText,
              disabled && Boolean(this.disabledTextColor)
                && { color: this.disabledTextColor },
            ]}
          >{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

SelectOption.propTypes = propTypes;
SelectOption.defaultProps = defaultProps;
SelectOption.contextTypes = contextTypes;
