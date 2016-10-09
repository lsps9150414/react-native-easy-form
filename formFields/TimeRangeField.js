import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { insertArray, splitArray } from '../utils';
import { optionContextTypes, selectPropTypes } from '../propTypes/selectField';

import Label from './Label';
import SelectOption from './SelectOption';
import { formFieldContextTypes } from '../propTypes';
import { formFieldStyles } from '../styles';
import moment from 'moment';

const propTypes = {
  ...selectPropTypes,
  minuteInterval: PropTypes.oneOf([1, 5, 10, 15, 20, 30, 60]),
  optionStartTime: PropTypes.instanceOf(Date),
  optionEndTime: PropTypes.instanceOf(Date),
};

const defaultProps = {
  minuteInterval: 60,
  grid: true,
};

const contextTypes = {
  ...formFieldContextTypes,
};

const childContextTypes = {
  ...optionContextTypes,
};

const styles = StyleSheet.create({
  optionRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

export default class TimeRangeField extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      timeOptions: this.validateOptionTimes() ? this.initTimeOptions() : [],
      selectedTimes: [],
      disabledTimes: this.getDisabledTimesfromFormData(context) || [],
    };
  }
  getChildContext = () => ({
    handleOnPress: this.handleOptionOnPress,
  })

  getDisabledTimesfromFormData = (context) => {
    if (!context.formData[this.props.name]) {
      return null;
    }
    if (!context.formData[this.props.name].disabledTimes) {
      return null;
    }
    return context.formData[this.props.name].disabledTimes.map(item => item.toString());
  }
  validateOptionTimes = () => {
    if (moment(this.props.optionEndTime).isSameOrAfter(this.props.optionStartTime)) {
      return true;
    }
    console.warn('"optionEndTime" should be same or after "optionStartTime"');
    return false;
  }
  initTimeOptions = () => {
    const timeOptions = [];
    const optionStartMoment = moment(this.props.optionStartTime);
    const optionEndMoment = moment(this.props.optionEndTime);
    for (
      let i = moment(optionStartMoment);
      i.isBefore(optionEndMoment);
      i.add(this.props.minuteInterval, 'm')
    ) {
      timeOptions.push(i.toDate().toString());
    }
    timeOptions.push(this.props.optionEndTime.toString());
    return timeOptions;
  }
  // TODO:
  // context.minuteInterval
  // context.selectedStartTime
  // context.selectedEndTime
  handleOptionOnPress = (value) => {
    this.toggleSelected(value);
  }
  toggleSelected = (value) => {
    if (this.state.selectedTimes.length === 0) {
      // - nothing selected => current NOT disabled ? => select
      this.setState({ selectedTimes: [value] });
    } else if (this.state.selectedTimes.length === 1) {
      // - single time selected => current NOT disabled ?
      const selectedMoment = moment(new Date(this.state.selectedTimes[0]));
      const newSelectMoment = moment(new Date(value));
      this.state.disabledTimes.forEach((disabledTime) => {
        if (
          moment(new Date(disabledTime)).isBetween(selectedMoment, newSelectMoment, null, '[]') ||
          moment(new Date(disabledTime)).isBetween(newSelectMoment, selectedMoment, null, '[]')
        ) {
          // - time range crossing disabled option ? => select current & unselect selected
          this.setState({ selectedTimes: [value] });
        } else {
          // - time range NOT crossing disabled option ? => select
          const updatedSelectedOptions = [];
          const beforMoment = selectedMoment.isBefore(newSelectMoment) ?
            moment(selectedMoment) : moment(newSelectMoment);
          const afterMoment = selectedMoment.isAfter(newSelectMoment) ?
            moment(selectedMoment) : moment(newSelectMoment);

          for (
            let i = moment(beforMoment);
            i.isSameOrBefore(afterMoment);
            i.add(this.props.minuteInterval, 'm')
          ) { updatedSelectedOptions.push(i.toDate().toString()); }
          this.setState({ selectedTimes: updatedSelectedOptions });
        }
      });
    } else {
      // - time range selected => current NOT disabled ?
      // - current near selected ends ? (inner & outer) => select current & unselect near end
      const beforeSelectedStartTime =
        moment(new Date(this.state.selectedTimes[0]))
        .subtract(this.props.minuteInterval, 'm');
      const afterSelectedEndTime =
        moment(new Date(this.state.selectedTimes[this.state.selectedTimes.length - 1]))
        .add(this.props.minuteInterval, 'm');

      if (moment(new Date(value)).isSame(beforeSelectedStartTime)) {
        const updatedSelectedOptions = this.state.selectedTimes;
        updatedSelectedOptions.unshift(value);
        this.setState({ selectedTimes: updatedSelectedOptions });
      } else if (moment(new Date(value)).isSame(afterSelectedEndTime)) {
        const updatedSelectedOptions = this.state.selectedTimes;
        updatedSelectedOptions.push(value);
        this.setState({ selectedTimes: updatedSelectedOptions });
      } else {
        // - current NOT near selected ends ? (inner & outer) => select current & unselect ends
        this.setState({ selectedTimes: [value] });
      }
    }
  }

  renderTimeOptionRows = () => {
    const timeOptionComponents = this.state.timeOptions.map((timeOption, index) => {
      const momentHour = moment(new Date(timeOption));
      momentHour.locale('en');
      const text = momentHour.format('hA').toString();
      const selected = this.state.selectedTimes.includes(timeOption);
      const disabled = this.state.disabledTimes.includes(timeOption);
      return (
        <SelectOption
          key={`timeOptions-${index}`}
          text={text}
          value={timeOption}
          selected={selected}
          disabled={disabled}
        />
      );
    });

    return (
      <View style={styles.optionRowContainer}>
        {timeOptionComponents}
      </View>
    );
  }

  render() {
    return (
      <View
        style={[
          formFieldStyles.fieldContainer,
          // { height: this.fieldHeight },
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
          {this.props.grid && this.renderTimeOptionRows()}
        </View>
      </View>
    );
  }

}

TimeRangeField.propTypes = propTypes;
TimeRangeField.defaultProps = defaultProps;
TimeRangeField.contextTypes = contextTypes;
TimeRangeField.childContextTypes = childContextTypes;
