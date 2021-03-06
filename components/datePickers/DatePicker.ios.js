import 'moment/locale/zh-tw';

import {
  ACTIVE_COLOR,
  DANGER_COLOR,
} from '../../constants/color';
import {
  Animated,
  DatePickerIOS,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  Component,
} from 'react';
import { dateFieldStyles, formFieldStyles } from '../../styles';

import { BASE_GRID_HEIGHT } from '../../constants/layout';
import _ from 'lodash/lang';
import { datePickerComponentPropTypes } from '../../propTypes/dateField';
import { formToFieldPropTypes } from '../../propTypes';
import moment from 'moment';

const propTypes = {
  ...formToFieldPropTypes,
  ...datePickerComponentPropTypes,
};

const defaultProps = {};

const MODAL_CONTENT_HEIGHT = BASE_GRID_HEIGHT + 220;
const MODAL_CONTENT_ANIM_DURATION = 300;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContentContainer: {
    backgroundColor: '#fff',
    height: MODAL_CONTENT_HEIGHT,
  },
  controlBar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    height: BASE_GRID_HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  controlButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  controlButtonText: {
    color: 'blue',
  },
  datePicker: {
  },
});

export default class IosDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.date,
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
    };
    this.theme = Boolean(props.theme) ? props.theme : false;
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.date, nextProps.date)) {
      this.setState({ date: nextProps.date });
    }
  }
  onDateChange = (date) => { this.setState({ date }); }

  openModal = () => {
    this.setState({ modalVisible: true });
    Animated.timing(
      this.state.animatedHeight,
      {
        toValue: MODAL_CONTENT_HEIGHT,
        duration: MODAL_CONTENT_ANIM_DURATION,
      }
    ).start();
  }
  closeModal = () => {
    this.setState({ modalVisible: false, animatedHeight: new Animated.Value(0) });
  }
  cancel = () => {
    this.closeModal();
    this.setState({ date: this.props.date });
  }
  confirm = () => {
    this.closeModal();
    this.props.onDateChange(this.state.date);
  }

  renderCancelButton = () => (
    <TouchableOpacity
      style={[styles.controlButton]}
      onPress={this.cancel}
    >
      <Text
        style={[
          styles.controlButtonText,
          { color: DANGER_COLOR },
          this.theme && this.theme.dangerColor && { color: this.theme.dangerColor },
        ]}
      >
        {Boolean(this.props.cancelBtnText) && this.props.cancelBtnText}
        {!Boolean(this.props.cancelBtnText) && 'Cancel'}
      </Text>
    </TouchableOpacity>
  )
  renderConfirmButton = () => (
    <TouchableOpacity
      style={[styles.controlButton]}
      onPress={this.confirm}
    >
      <Text
        style={[
          styles.controlButtonText,
          { color: ACTIVE_COLOR, fontWeight: 'bold' },
          this.theme && this.theme.activeColor && { color: this.theme.activeColor },
        ]}
      >
      {Boolean(this.props.confirmBtnText) && this.props.confirmBtnText}
      {!Boolean(this.props.confirmBtnText) && 'Confirm'}
      </Text>
    </TouchableOpacity>
  )
  renderControlBar = () => (
    <View style={styles.controlBar}>
      {this.renderCancelButton()}
      {this.renderConfirmButton()}
    </View>
  )
  renderDatePicker = () => (
    <DatePickerIOS
      style={styles.datePicker}
      mode={'date'}
      date={this.state.date}
      onDateChange={this.onDateChange}
      minimumDate={this.props.minDate}
      maximumDate={this.props.maxDate}
    />
  );
  renderModal = () => (
    <Modal
      visible={this.state.modalVisible}
      transparent
      animationType={'fade'}
      onRequestClose={() => { console.log('Modal has been closed.'); }}
    >
      <View style={[styles.modalContainer]}>
        <Animated.View
          style={[
            styles.modalContentContainer,
            { height: this.state.animatedHeight },
          ]}
        >
          {this.renderControlBar()}
          {this.renderDatePicker()}
        </Animated.View>
      </View>
    </Modal>
  )

  render() {
    const momentDate = moment(this.props.date);
    momentDate.locale('zh-tw');
    return (
      <View
        style={[dateFieldStyles.dateTextContainer]}
      >
        <TouchableOpacity
          style={[dateFieldStyles.dateTextContainer]}
          onPress={this.openModal}
        >
          <Text
            style={[formFieldStyles.inputText]}
          >
            {momentDate.format('Y / M / D  (ddd)')}
          </Text>
        </TouchableOpacity>
        {this.renderModal()}
      </View>
    );
  }

}

IosDatePicker.propTypes = propTypes;
IosDatePicker.defaultProps = defaultProps;
