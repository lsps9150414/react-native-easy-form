import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { insertArray, splitArray } from '../utils';
import { optionContextTypes, selectDefaultProps, selectPropTypes } from '../propTypes/selectField';

import { BASE_GRID_HEIGHT } from '../constants/layout';
import Label from './Label';
import SelectOption from './SelectOption';
import Separator from '../components/separators/Separator';
import SeparatorVertical from '../components/separators/SeparatorVertical';
import { formFieldContextTypes } from '../propTypes';
import { formFieldStyles } from '../styles';

const propTypes = {
  ...selectPropTypes,
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
    };
  }
  getChildContext = () => ({
    handleOnPress: this.handleOptionOnPress,
  })
  componentWillMount() {
    this.setFieldHeight();
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.updateSelectedFromFormData(nextContext.formData[this.props.name]);
  }

  getRowCount = () => (
    this.props.grid ?
      (Math.ceil(React.Children.count(this.props.children) / this.props.numberOfItemsInOneRow))
      : React.Children.count(this.props.children)
  )
  setFieldHeight = () => {
    this.fieldHeight = this.context.baseGridHeight ?
      (this.context.baseGridHeight * this.getRowCount()) : (BASE_GRID_HEIGHT * this.getRowCount());
  }

  getOptionProps = () => (
    React.Children.map(this.props.children, child => child.props)
  )
  getSeparatorStyle = () => {
    if (Boolean(this.context.theme) && Boolean(this.context.theme.separatorColor)) {
      return ({ borderColor: this.context.theme.separatorColor, ...this.props.separatorStyle });
    }
    return (this.props.separatorStyle);
  }

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
    const rowOptionProps = splitArray(optionProps, this.props.numberOfItemsInOneRow);
    const rowsWithSeparator = insertArray(rowOptionProps, 'separator', 1);
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
      const rowItemsToRender = rowItemsWithSeparator.map((item, itemIndex) => {
        if (item === 'separator') {
          return (
            <SeparatorVertical
              key={`${this.props.name}GridSeparators-${itemIndex}`}
              style={this.getSeparatorStyle()}
            />
          );
        }
        return (
          <SelectOption
            key={`${this.props.name}Options-${itemIndex}`}
            text={item.text}
            value={item.value}
            selected={Boolean(this.state.selectedOptions[item.value])}
            disabled={this.state.selectedOptions[item.value] === false}
            textStyle={this.props.optionTextStyle}
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
    const itemsToRender = insertArray(optionProps, 'separator', 1);
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
          <SelectOption
            key={`${this.props.name}Options-${index}`}
            text={item.text}
            value={item.value}
            selected={Boolean(this.state.selectedOptions[item.value])}
            disabled={this.state.selectedOptions[item.value] === false}
            textStyle={this.props.optionTextStyle}
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
          { height: this.fieldHeight },
        ]}
      >
        <Label title={this.props.title} labelContainerStyle={this.context.labelContainerStyle} />
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
