import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { formFieldStyles } from '../styles';
import { optionContextTypes } from '../propTypes/selectField';

const propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  textStyle: Text.propTypes.style,
};

const defaultProps = {
};

const contextTypes = {
  ...optionContextTypes,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#666',
  },
  selectedText: {
    color: '#fff',
  },
  disabled: {
    backgroundColor: '#aaa',
  },
  disabledText: {
    color: '#ddd',
  },
});

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
        style={[
          styles.container,
          selected && styles.selected,
          selected && Boolean(this.activeColor) && { backgroundColor: this.activeColor },
          disabled && styles.disabled,
          disabled && Boolean(this.disabledColor)
            && { backgroundColor: this.disabledColor },
        ]}
        onPress={this.handleOnPress}
        disabled={disabled}
      >
        <Text
          style={[
            formFieldStyles.inputText,
            styles.text,
            Boolean(this.props.textStyle) && this.props.textStyle,
            selected && styles.selectedText,
            selected && Boolean(this.activeTextColor) && { color: this.activeTextColor },
            disabled && styles.disabledText,
            disabled && Boolean(this.disabledTextColor)
              && { color: this.disabledTextColor },
          ]}
        >{this.props.text}</Text>
      </TouchableOpacity>
    );
  }

}

SelectOption.propTypes = propTypes;
SelectOption.defaultProps = defaultProps;
SelectOption.contextTypes = contextTypes;
