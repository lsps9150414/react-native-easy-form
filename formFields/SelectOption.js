import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { optionContextTypes } from '../propTypes/selectField';

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
const defaultProps = {
  disabled: false,
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
    const selected = Boolean(this.context.selectedValues[this.props.value]);
    return (
      <TouchableOpacity
        style={[
          styles.container,
          selected && styles.selected,
          selected && Boolean(this.activeColor) && { backgroundColor: this.activeColor },
          this.props.disabled && styles.disabled,
          this.props.disabled && Boolean(this.disabledColor)
            && { backgroundColor: this.disabledColor },
        ]}
        onPress={this.handleOnPress}
        disabled={this.props.disabled}
      >
        <Text
          style={[
            selected && styles.selectedText,
            selected && Boolean(this.activeTextColor) && { color: this.activeTextColor },
            this.props.disabled && styles.disabledText,
            this.props.disabled && Boolean(this.disabledTextColor)
              && { color: this.disabledTextColor },
          ]}
        >{this.props.title}</Text>
      </TouchableOpacity>
    );
  }

}

SelectOption.propTypes = propTypes;
SelectOption.defaultProps = defaultProps;
SelectOption.contextTypes = contextTypes;
