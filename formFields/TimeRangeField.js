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

import Label from './Label';
import SelectOption from './SelectOption';
import Separator from '../components/separators/Separator';
import SeparatorVertical from '../components/separators/SeparatorVertical';
import _ from 'lodash/lang';
import { formFieldContextTypes } from '../propTypes';
import { formFieldStyles } from '../styles';
import moment from 'moment';

const propTypes = {
  ...selectPropTypes,
  minuteInterval: PropTypes.number,
  optionStartTime: PropTypes.instanceOf(Date),
  optionEndTime: PropTypes.instanceOf(Date),
};

const defaultProps = {
  ...selectDefaultProps,
  grid: true,
  minuteInterval: 60,
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
      timeOptions: [],
      selectedTimes: [],
      disabledTimes: this.getDisabledTimesfromFormData(context),
      fieldHeight: this.getFieldHeight(context.baseGridHeight),
    };
  }
  getChildContext = () => ({
    handleOnPress: this.handleOptionOnPress,
  })
  componentWillMount() {
    this.setState({
      timeOptions: this.validateOptionTimes() ? this.initTimeOptions(this.props) : [],
    });
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (
      !_.isEqual(this.props.optionStartTime, nextProps.optionStartTime) ||
      !_.isEqual(this.props.optionEndTime, nextProps.optionEndTime) ||
      (this.props.minuteInterval !== nextProps.minuteInterval)
    ) {
      this.setState({
        timeOptions: this.validateOptionTimes() ? this.initTimeOptions(nextProps) : [],
      });
    }
    if (Boolean(nextContext.formData) && Boolean(nextContext.formData[this.props.name])) {
      const fieldFormDataChanged = !_.isEqual(
        nextContext.formData[this.props.name],
        this.context.formData[this.props.name]
      );
      if (fieldFormDataChanged) {
        const resetSelectedTimes =
        !Boolean(nextContext.formData[this.props.name].selectedStartTime) ||
        !Boolean(nextContext.formData[this.props.name].selectedEndTime);
        // TODO: Create a setSelectedTimes() to handle selectedTimes from form data.
        // setSelectedTimes() should return empty array when time range not valid.
        // i.e. crossing any disabled times.
        this.setState({
          disabledTimes: this.getDisabledTimesfromFormData(nextContext),
          selectedTimes: resetSelectedTimes ? [] : this.state.selectedTimes,
        });
      }
    }
  }
  getRowCount = () => {
    if (Boolean(this.state)) {
      return (
        this.props.grid ?
          (Math.ceil(this.state.timeOptions.length / this.props.numberOfItemsInOneRow) || 1)
          : (this.state.timeOptions.length || 1)
      );
    }
    return (
      this.props.grid ?
      (Math.ceil(this.initTimeOptions.length / this.props.numberOfItemsInOneRow))
      : this.initTimeOptions.length
    );
  }
  getFieldHeight = (baseGridHeight) => {
    if (Boolean(baseGridHeight)) {
      return (baseGridHeight * this.getRowCount());
    }
    return (this.context.baseGridHeight * this.getRowCount());
  }
  getSeparatorStyle = () => {
    if (Boolean(this.context.theme) && Boolean(this.context.theme.separatorColor)) {
      return ({ borderColor: this.context.theme.separatorColor, ...this.props.separatorStyle });
    }
    return (this.props.separatorStyle);
  }

  getDisabledTimesfromFormData = (context) => {
    if (!context.formData[this.props.name]) { return []; }
    if (!context.formData[this.props.name].disabledTimes) { return []; }
    return context.formData[this.props.name].disabledTimes.map(item => item.toString()) || [];
  }
  validateOptionTimes = () => {
    if (moment(this.props.optionEndTime).isSameOrAfter(this.props.optionStartTime)) {
      return true;
    }
    console.warn(
      `Field: ${this.props.name}'s '"optionEndTime" should be same or after "optionStartTime"`
    );
    return false;
  }
  initTimeOptions = (props) => {
    const timeOptions = [];
    const optionStartMoment = moment(props.optionStartTime);
    const optionEndMoment = moment(props.optionEndTime);
    for (
      let i = moment(optionStartMoment);
      i.isBefore(optionEndMoment);
      i.add(props.minuteInterval, 'm')
    ) {
      timeOptions.push(i.toDate().toString());
    }
    return timeOptions;
  }

  handleOptionOnPress = (value) => {
    this.toggleSelected(value);
  }
  toggleSelected = (value) => {
    if (this.state.selectedTimes.length === 0) {
      // - nothing selected => select
      this.setState({ selectedTimes: [value] }, this.handleStateChange);
    } else if (this.state.selectedTimes.length === 1) {
      // - single time selected
      const selectedMoment = moment(new Date(this.state.selectedTimes[0]));
      const newSelectMoment = moment(new Date(value));
      let crossed = false;
      const updatedSelectedOptions = [];
      this.state.disabledTimes.some((disabledTime) => {
        if (
          moment(new Date(disabledTime)).isBetween(selectedMoment, newSelectMoment, null, '[]') ||
          moment(new Date(disabledTime)).isBetween(newSelectMoment, selectedMoment, null, '[]')
        ) {
        // - time range crossing disabled option ? => select current & unselect selected
          crossed = true;
          return true;
        }
        return false;
      });
      // - time range NOT crossing disabled option ? => select
      const beforMoment = selectedMoment.isBefore(newSelectMoment) ?
      moment(selectedMoment) : moment(newSelectMoment);
      const afterMoment = selectedMoment.isAfter(newSelectMoment) ?
      moment(selectedMoment) : moment(newSelectMoment);
      for (
        let i = moment(beforMoment);
        i.isSameOrBefore(afterMoment);
        i.add(this.props.minuteInterval, 'm')
      ) { updatedSelectedOptions.push(i.toDate().toString()); }
      if (crossed) {
        this.setState({ selectedTimes: [value] }, this.handleStateChange);
      } else {
        this.setState({ selectedTimes: updatedSelectedOptions }, this.handleStateChange);
      }
    } else {
      // - time range selected
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
        this.setState({ selectedTimes: updatedSelectedOptions }, this.handleStateChange);
      } else if (moment(new Date(value)).isSame(afterSelectedEndTime)) {
        const updatedSelectedOptions = this.state.selectedTimes;
        updatedSelectedOptions.push(value);
        this.setState({ selectedTimes: updatedSelectedOptions }, this.handleStateChange);
      } else {
        // - current NOT near selected ends ? (inner & outer) => select current & unselect ends
        this.setState({ selectedTimes: [value] }, this.handleStateChange);
      }
    }
  }
  handleStateChange = () => {
    const state = {
      selectedStartTime: new Date(this.state.selectedTimes[0]),
      selectedEndTime:
        moment(
          new Date(this.state.selectedTimes[this.state.selectedTimes.length - 1])
        ).add(this.props.minuteInterval, 'm').toDate(),
      disabledTimes: this.state.disabledTimes,
    };
    if (this.props.onValueChange) {
      this.props.onValueChange(this.props.name, state);
    }
    this.context.handleValueChange(this.props.name, state);
  }

  renderTimeOptionRows = () => {
    if (this.state.timeOptions.length === 0) { return null; }
    const rowTimeOptionProps = splitArray(this.state.timeOptions, this.props.numberOfItemsInOneRow);
    extendArray(
      rowTimeOptionProps[rowTimeOptionProps.length - 1],
      'empty', this.props.numberOfItemsInOneRow
    );
    const rowsWithSeparator = insertArray(rowTimeOptionProps, 'separator', 1);
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
        const momentHour = moment(new Date(item));
        momentHour.locale('en');
        const formatedTime = this.props.minuteInterval === 60 ?
          momentHour.format('hA').toString() : momentHour.format('h:mm A').toString();
        const selected = this.state.selectedTimes.includes(item);
        const disabled = this.state.disabledTimes.includes(item);
        return (
          <SelectOption
            key={`timeOptions-${itemIndex}`}
            text={formatedTime}
            value={item}
            selected={selected}
            disabled={disabled}
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
  renderTimeOptionList = () => {
    if (this.state.timeOptions.length === 0) { return null; }
    const itemsToRender = insertArray(this.state.timeOptions, 'separator', 1);
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
        const momentHour = moment(new Date(item));
        momentHour.locale('en');
        const formatedTime = this.props.minuteInterval === 60 ?
          momentHour.format('hA').toString() : momentHour.format('h:mm A').toString();
        const selected = this.state.selectedTimes.includes(item);
        const disabled = this.state.disabledTimes.includes(item);
        return (
          <SelectOption
            key={`timeOptions-${index}`}
            text={formatedTime}
            value={item}
            selected={selected}
            disabled={disabled}
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
          { height: this.getFieldHeight() },
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
          {this.props.grid && this.renderTimeOptionRows()}
          {!this.props.grid && this.renderTimeOptionList()}
        </View>
      </View>
    );
  }

}

TimeRangeField.propTypes = propTypes;
TimeRangeField.defaultProps = defaultProps;
TimeRangeField.contextTypes = contextTypes;
TimeRangeField.childContextTypes = childContextTypes;
