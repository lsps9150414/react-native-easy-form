import React, {
  Component,
  PropTypes,
} from 'react';
import {
  TouchableOpacity,
} from 'react-native';

import { SelectOptionStyles } from '../styles';
import { optionContextTypes, selectOptionPropTypes } from '../propTypes/selectField';

const propTypes = {
  ...selectOptionPropTypes,
  customOptionView: PropTypes.func.isRequired,
};

const defaultProps = {
};

const contextTypes = {
  ...optionContextTypes,
};

export default class CustomSelectOptionWrapper extends Component {
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
    const CustomOptionView = this.props.customOptionView;
    return (
      <TouchableOpacity
        style={[
          SelectOptionStyles.container,
          selected && SelectOptionStyles.selected,
          selected && Boolean(this.activeColor) && { backgroundColor: this.activeColor },
          disabled && SelectOptionStyles.disabled,
          disabled && Boolean(this.disabledColor)
            && { backgroundColor: this.disabledColor },
        ]}
        onPress={this.handleOnPress}
        disabled={disabled}
      >
        <CustomOptionView {...this.props} {...this.con} />
      </TouchableOpacity>
    );
  }

}

CustomSelectOptionWrapper.propTypes = propTypes;
CustomSelectOptionWrapper.defaultProps = defaultProps;
CustomSelectOptionWrapper.contextTypes = contextTypes;
