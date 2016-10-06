import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { formFieldContextTypes, formFieldPropTypes } from '../propTypes';

import Label from './Label';
import { formFieldStyles } from '../styles';
import { optionContextTypes } from '../propTypes/selectField';

const propTypes = {
  ...formFieldPropTypes,
  multipleSelections: PropTypes.bool,
  numberOfRows: PropTypes.number,
};
const defaultProps = {
  multipleSelections: false,
};
const contextTypes = {
  ...formFieldContextTypes,
};
const childContextTypes = {
  ...optionContextTypes,
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
  },
});

export default class GridSelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: {},
    };
  }
  getChildContext = () => ({
    selectedValues: this.state.selectedValues,
    handleOnPress: this.handleOptionOnPress,
  })

  handleValueChange = (value) => {
    this.context.handleValueChange(this.props.name, value);
  }
  handleOptionOnPress = (value) => {
    this.toggleSelected(value);
  }
  toggleSelected = (value) => {
    if (this.props.multipleSelections) {
      this.setState(
        {
          selectedValues: {
            ...this.state.selectedValues,
            [value]: !this.state.selectedValues[value],
          },
        },
        () => { this.handleValueChange(this.state.selectedValues); }
      );
    } else {
      this.setState(
        { selectedValues: { [value]: true } },
        () => { this.handleValueChange(value); }
      );
    }
  }
  renderOptions = () => React.Children.map(this.props.children, child => child)
  render() {
    return (
      <View style={[formFieldStyles.fieldGroup]}>
        <Label title={this.props.title} labelContainerStyles={this.context.labelContainerStyles} />
        <View
          style={[
            formFieldStyles.inputContainer,
            styles.inputContainer,
            this.context.inputContainerStyles,
          ]}
        >
          {this.renderOptions()}
        </View>
      </View>
    );
  }

}

GridSelectField.propTypes = propTypes;
GridSelectField.defaultProps = defaultProps;
GridSelectField.contextTypes = contextTypes;
GridSelectField.childContextTypes = childContextTypes;
