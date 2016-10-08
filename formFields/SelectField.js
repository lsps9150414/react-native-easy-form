import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { formFieldContextTypes, formFieldPropTypes } from '../propTypes';

import { BASE_GRID_HEIGHT } from '../constants/layout';
import Label from './Label';
import Separator from '../components/separators/Separator';
import SeparatorVertical from '../components/separators/SeparatorVertical';
import { formFieldStyles } from '../styles';
import { insertSeparator } from '../utils';
import { optionContextTypes } from '../propTypes/selectField';

const propTypes = {
  ...formFieldPropTypes,
  numberOfItemsInOneRow: PropTypes.number,
  multipleSelections: PropTypes.bool,
  grid: PropTypes.bool,
  separatorStyle: View.propTypes.style,
};
const defaultProps = {
  multipleSelections: false,
  grid: false,
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
    this.setRowCount();
    this.setFieldHeight(context);
  }
  getChildContext = () => ({
    selectedOptions: this.state.selectedOptions,
    handleOnPress: this.handleOptionOnPress,
  })
  componentWillReceiveProps(nextProps, nextContext) {
    this.updateSelectedFromFormData(nextContext.formData[this.props.name]);
  }

  setRowCount = () => {
    this.rowCount = this.props.grid ?
      (Math.ceil(React.Children.count(this.props.children) / this.props.numberOfItemsInOneRow))
      : React.Children.count(this.props.children);
  }
  setFieldHeight = (context) => {
    this.fieldHeight = context.baseGridHeight ?
      (context.baseGridHeight * this.rowCount) : (BASE_GRID_HEIGHT * this.rowCount);
  }
  getPropsForSeparator = () => {
    if (Boolean(this.context.theme) && Boolean(this.context.theme.separatorColor)) {
      return ({
        style: { borderColor: this.context.theme.separatorColor, ...this.props.separatorStyle },
      });
    }
    return ({ style: this.props.separatorStyle });
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
    if (!Boolean(this.props.numberOfItemsInOneRow)) {
      return (
        <View style={styles.optionRowContainer}>
          {React.Children.map(this.props.children, child => child)}
        </View>
      );
    }
    // Slice options into rows.
    const optionRows = [];
    const childrenArray = React.Children.toArray(this.props.children);
    while (childrenArray.length > 0) {
      optionRows.push(childrenArray.splice(0, this.props.numberOfItemsInOneRow));
    }
    const optionRowsWithSeparator = insertSeparator(optionRows, Separator, this.getPropsForSeparator());

    return optionRowsWithSeparator.map((optionRow, index) => {
      if (Array.isArray(optionRow)) {
        const rowItemsWithSeparator = insertSeparator(optionRow, SeparatorVertical, this.getPropsForSeparator());
        return (
          <View key={`optionRows-${index}`} style={styles.optionRowContainer}>
          {rowItemsWithSeparator.map(item => item)}
          </View>
        );
      }
      return optionRow;
    });
  }
  renderOptionList = () => {
    const childrenArray = React.Children.toArray(this.props.children);
    return insertSeparator(childrenArray, Separator, this.getPropsForSeparator());
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
          {!this.props.grid && this.renderOptionList()}
          {this.props.grid && this.renderOptionRows()}
        </View>
      </View>
    );
  }

}

SelectField.propTypes = propTypes;
SelectField.defaultProps = defaultProps;
SelectField.contextTypes = contextTypes;
SelectField.childContextTypes = childContextTypes;
