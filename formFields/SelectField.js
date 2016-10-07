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
import Separator from '../components/Separator';
import SeperatorVertical from '../components/SeperatorVertical';
import { formFieldStyles } from '../styles';
import { insertSeparator } from '../utils';
import { optionContextTypes } from '../propTypes/selectField';

const propTypes = {
  ...formFieldPropTypes,
  numberOfItemsInOneRow: PropTypes.number,
  multipleSelections: PropTypes.bool,
  grid: PropTypes.bool,
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
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: {},
    };
    this.rowCount = props.grid ?
      Math.ceil(React.Children.count(props.children) / props.numberOfItemsInOneRow)
      : React.Children.count(props.children);
  }
  getChildContext = () => ({
    selectedOptions: this.state.selectedOptions,
    handleOnPress: this.handleOptionOnPress,
  })

  componentWillMount() {
    this.setFieldHeight();
    this.updateSelectedFromFormData();
  }
  // componentWillReceiveProps(nextProps, nextContext) {
  //   if (nextContext.formData[this.props.name] !== this.context.formData[this.props.name]) {
  //     // this.setState({ selectedOptions: nextContext.formData[this.props.name] });
  //     console.log('context changed');
  //   }
  // }
  setFieldHeight = () => {
    this.fieldHeight = this.context.baseGridHeight ?
      (this.context.baseGridHeight * this.rowCount) : (BASE_GRID_HEIGHT * this.rowCount);
  }
  updateSelectedFromFormData = () => {
    if (Boolean(this.context.formData[this.props.name])) {
      this.setState({ selectedOptions: this.context.formData[this.props.name] });
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
          () => { this.handleValueChange(this.state.selectedOptions); }
        );
      } else {
        this.setState(
          { selectedOptions: { ...this.state.selectedOptions, [value]: true } },
          () => { this.handleValueChange(this.state.selectedOptions); }
        );
      }
    } else {
      this.setState(
        { selectedOptions: { [value]: true } },
        () => { this.handleValueChange(value); }
      );
    }
  }
  handleValueChange = (value) => {
    this.context.handleValueChange(this.props.name, value);
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
    const optionRowsWithSeperator = insertSeparator(optionRows, Separator);

    return optionRowsWithSeperator.map((optionRow, index) => {
      if (Array.isArray(optionRow)) {
        const rowItemsWithSeperator = insertSeparator(optionRow, SeperatorVertical);
        return (
          <View key={`optionRows-${index}`} style={styles.optionRowContainer}>
          {rowItemsWithSeperator.map(item => item)}
          </View>
        );
      }
      return optionRow;
    });
  }
  renderOptionList = () => {
    const childrenArray = React.Children.toArray(this.props.children);
    return insertSeparator(childrenArray, Separator);
  }

  render() {
    return (
      <View
        style={[
          formFieldStyles.fieldGroup,
          { height: this.fieldHeight },
        ]}
      >
        <Label title={this.props.title} labelContainerStyles={this.context.labelContainerStyles} />
        <View
          style={[
            formFieldStyles.inputContainer,
            styles.inputContainer,
            this.context.inputContainerStyles,
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
