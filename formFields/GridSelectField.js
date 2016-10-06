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
import { formFieldStyles } from '../styles';
import { optionContextTypes } from '../propTypes/selectField';

const propTypes = {
  ...formFieldPropTypes,
  multipleSelections: PropTypes.bool,
  numberOfItemsInOneRow: PropTypes.number,
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
    flexDirection: 'column',
  },
  optionRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

export default class GridSelectField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: {},
    };
    this.rowCount = Math.ceil(React.Children.count(props.children) / props.numberOfItemsInOneRow);
  }
  getChildContext = () => ({
    selectedValues: this.state.selectedValues,
    handleOnPress: this.handleOptionOnPress,
  })

  componentWillMount() {
    this.fieldHeight = this.context.baseGridHeight ?
      (this.context.baseGridHeight * this.rowCount) : (BASE_GRID_HEIGHT * this.rowCount);
  }

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
  renderOptionRows = () => {
    if (!Boolean(this.props.numberOfItemsInOneRow)) {
      return (
        <View style={styles.optionRowContainer}>
          {React.Children.map(this.props.children, child => child)}
        </View>
      );
    }
    const optionRows = [];
    const childrenArray = React.Children.toArray(this.props.children);
    while (childrenArray.length > 0) {
      optionRows.push(childrenArray.splice(0, this.props.numberOfItemsInOneRow));
    }
    return optionRows.map((row, index) => (
      <View key={`optionRows-${index}`} style={styles.optionRowContainer}>
        {row.map(option => option)}
      </View>
    ));
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
          {this.renderOptionRows()}
        </View>
      </View>
    );
  }

}

GridSelectField.propTypes = propTypes;
GridSelectField.defaultProps = defaultProps;
GridSelectField.contextTypes = contextTypes;
GridSelectField.childContextTypes = childContextTypes;
