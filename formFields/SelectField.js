import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { extendArray, insertArray, splitArray } from '../utils';
import { optionContextTypes, selectDefaultProps, selectPropTypes } from '../propTypes/selectField';

import CustomSelectOptionWrapper from './CustomSelectOptionWrapper';
import Label from './Label';
import SelectOption from './SelectOption';
import Separator from '../components/separators/Separator';
import SeparatorVertical from '../components/separators/SeparatorVertical';
import { THEME } from '../constants/color';
import { formFieldContextTypes } from '../propTypes';
import { formFieldStyles } from '../styles';

const propTypes = {
  ...selectPropTypes,
  customOptionView: PropTypes.func,
  customOptionProps: PropTypes.arrayOf(PropTypes.object),
  customOptionHeight: PropTypes.bool,
};
const defaultProps = {
  ...selectDefaultProps,
};
const contextTypes = {
  ...formFieldContextTypes,
};
const childContextTypes = {
  ...optionContextTypes,
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
  },
  optionRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

export default class SelectField extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      selectedOptions: context.formData[props.name] || {},
      fieldHeight: this.getFieldHeight(context.baseGridHeight),
    };
  }
  getChildContext = () => ({
    handleOnPress: this.handleOptionOnPress,
  })
  componentWillReceiveProps(nextProps, nextContext) {
    this.updateSelectedFromFormData(nextContext.formData[this.props.name]);
  }

  getRowCount = () => {
    if (Boolean(this.props.customOptionProps) && Boolean(this.props.customOptionView)) {
      return this.props.grid ?
        Math.ceil(this.props.customOptionProps.length / this.props.numberOfItemsInOneRow)
        : this.props.customOptionProps.length;
    }
    return this.props.grid ?
      Math.ceil(React.Children.count(this.props.children) / this.props.numberOfItemsInOneRow)
      : React.Children.count(this.props.children);
  }
  getFieldHeight = (baseGridHeight) => {
    if (Boolean(baseGridHeight)) {
      return (baseGridHeight * this.getRowCount());
    }
    return (this.context.baseGridHeight * this.getRowCount());
  }

  getOptionProps = () => {
    if (Boolean(this.props.customOptionProps) && Boolean(this.props.customOptionView)) {
      return this.props.customOptionProps;
    }
    return React.Children.map(this.props.children, child => child.props);
  }
  getSeparatorStyle = () => {
    if (Boolean(this.context.theme) && Boolean(this.context.theme.separatorColor)) {
      return ({ borderColor: this.context.theme.separatorColor, ...this.props.separatorStyle });
    }
    return (this.props.separatorStyle);
  }
  getFormPropsForCustomOptionView = () => ({
    baseGridHeight: this.context.baseGridHeight,
    theme: { ...THEME, ...this.context.theme },
    labelContainerStyle: this.context.labelContainerStyle,
    inputContainerStyle: this.context.inputContainerStyle,
  })

  updateSelectedFromFormData = (selectedOptions) => {
    if (Boolean(selectedOptions)) {
      this.setState({ selectedOptions });
    } else {
      this.setState({ selectedOptions: {} });
    }
  }

  handleOptionOnPress = (value) => {
    this.toggleSelected(value);
  }
  toggleSelected = (value) => {
    if (this.props.multipleSelections) {
      if (Boolean(this.state.selectedOptions[value])) {
        const updatedSelectedOptions = this.state.selectedOptions;
        delete updatedSelectedOptions[value];
        this.setState(
          { selectedOptions: updatedSelectedOptions },
          this.handleStateChange
        );
      } else {
        this.setState(
          { selectedOptions: { ...this.state.selectedOptions, [value]: true } },
          this.handleStateChange
        );
      }
    } else {
      const updatedSelectedOptions = this.state.selectedOptions;
      const lastSelectedKeys =
        Object.keys(updatedSelectedOptions).filter(key => updatedSelectedOptions[key]);
      lastSelectedKeys.forEach(key => {
        delete updatedSelectedOptions[key];
      });
      updatedSelectedOptions[value] = true;
      this.setState(
        { selectedOptions: updatedSelectedOptions },
        this.handleStateChange
      );
    }
  }
  handleStateChange = () => {
    if (this.props.onValueChange) {
      this.props.onValueChange(this.state.selectedOptions);
    }
    this.context.handleValueChange(this.props.name, this.state.selectedOptions);
  }

  renderOptionRows = () => {
    const optionProps = this.getOptionProps();
    if (!Boolean(optionProps)) { return null; }
    const rowOptionProps = splitArray(optionProps, this.props.numberOfItemsInOneRow);
    extendArray(
      rowOptionProps[rowOptionProps.length - 1],
      'empty', this.props.numberOfItemsInOneRow
    );
    const rowsWithSeparator = insertArray(rowOptionProps, 'separator', 1);
    const SelectOptionComponent = Boolean(this.props.customOptionView) ?
      CustomSelectOptionWrapper : SelectOption;

    return rowsWithSeparator.map((row, rowIndex) => {
      // Row of Separator
      if (row === 'separator') {
        return (
          <Separator
            key={`${this.props.name}GridSeparators-${rowIndex}`}
            style={this.getSeparatorStyle()}
          />
        );
      }
      // Row of options
      const rowItemsWithSeparator = insertArray(row, 'separator', 1);
      let emptySlotReachedFlag = false;
      const rowItemsToRender = rowItemsWithSeparator.map((item, itemIndex) => {
        if (item === 'separator') {
          return (
            <SeparatorVertical
              key={`${this.props.name}GridSeparators-${itemIndex}`}
              style={[
                this.getSeparatorStyle(),
                emptySlotReachedFlag && { borderColor: 'transparent' },
              ]}
            />
          );
        } else if (item === 'empty') {
          emptySlotReachedFlag = true;
          return (
            <View key={`${this.props.name}GridSeparators-${itemIndex}`} style={{ flex: 1 }} />
          );
        }
        return (
          <SelectOptionComponent
            key={`${this.props.name}Options-${itemIndex}`}
            {...item}
            selected={Boolean(this.state.selectedOptions[item.value])}
            disabled={this.state.selectedOptions[item.value] === false}
            textStyle={this.props.optionTextStyle}
            customOptionView={this.props.customOptionView}
            formProps={this.getFormPropsForCustomOptionView()}
          />
        );
      });
      return (
        <View key={`${this.props.name}GridRows-${rowIndex}`} style={styles.optionRowContainer}>
          {rowItemsToRender}
        </View>
      );
    });
  }
  renderOptionList = () => {
    const optionProps = this.getOptionProps();
    if (!Boolean(optionProps)) { return null; }
    let itemsToRender = insertArray(optionProps, 'separator', 1);
    if (!itemsToRender) {
      itemsToRender = optionProps;
    }
    const SelectOptionComponent = Boolean(this.props.customOptionView) ?
      CustomSelectOptionWrapper : SelectOption;

    return (
      itemsToRender.map((item, index) => {
        if (item === 'separator') {
          return (
            <Separator
              key={`${this.props.name}ListSeparators-${index}`}
              style={this.getSeparatorStyle()}
            />
          );
        }
        return (
          <SelectOptionComponent
            key={`${this.props.name}Options-${index}`}
            {...item}
            selected={Boolean(this.state.selectedOptions[item.value])}
            disabled={this.state.selectedOptions[item.value] === false}
            textStyle={this.props.optionTextStyle}
            customOptionView={this.props.customOptionView}
            formProps={this.getFormPropsForCustomOptionView()}
          />
        );
      })
    );
  }

  render() {
    return (
      <View
        style={[
          formFieldStyles.fieldContainer,
          { height: this.getFieldHeight() },
          this.props.customOptionHeight && { height: null },
        ]}
      >
        <Label
          title={this.props.title}
          containerStyle={this.context.labelContainerStyle}
          textStyle={this.context.labelTextStyle}
        />
        <View
          style={[
            formFieldStyles.inputContainer,
            styles.inputContainer,
            this.context.inputContainerStyle,
          ]}
        >
          {this.props.grid && this.renderOptionRows()}
          {!this.props.grid && this.renderOptionList()}
        </View>
      </View>
    );
  }

}

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;
SelectField.contextTypes = contextTypes;
SelectField.childContextTypes = childContextTypes;
