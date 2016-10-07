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
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  title: PropTypes.string.isRequired,
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
  componentWillReceiveProps(nextProps, nextContext) {
    this.selected = Boolean(nextContext.selectedOptions[this.props.value]);
    this.disabled = nextContext.selectedOptions[this.props.value] === false;
  }

  handleOnPress = () => {
    if (!this.disabled) {
      this.context.handleOnPress(String(this.props.value));
    }
  }
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          this.selected && styles.selected,
          this.selected && Boolean(this.activeColor) && { backgroundColor: this.activeColor },
          this.disabled && styles.disabled,
          this.disabled && Boolean(this.disabledColor)
            && { backgroundColor: this.disabledColor },
        ]}
        onPress={this.handleOnPress}
        disabled={this.disabled}
      >
        <Text
          style={[
            formFieldStyles.inputText,
            styles.text,
            this.selected && styles.selectedText,
            this.selected && Boolean(this.activeTextColor) && { color: this.activeTextColor },
            this.disabled && styles.disabledText,
            this.disabled && Boolean(this.disabledTextColor)
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
