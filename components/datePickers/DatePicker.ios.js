import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { dateFieldStyles, formFieldStyles } from '../../styles';

const propTypes = {
  date: PropTypes.object.isRequired,
};

const defaultProps = {};

const styles = StyleSheet.create({
});

export default class DatePickerIos extends Component {
  openDatePicker = () => {

  }
  render() {
    return (
      <TouchableOpacity
        style={[dateFieldStyles.dateTextContainer]}
        onPress={this.openDatePicker}
      >
        <Text
          style={[formFieldStyles.inputText]}
        >
          {this.props.date.toString()}
        </Text>
      </TouchableOpacity>
    );
  }

}

DatePickerIos.propTypes = propTypes;
DatePickerIos.defaultProps = defaultProps;
