import {
  DatePickerIOS,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React, {
  Component,
  PropTypes,
} from 'react';
import { dateFieldStyles, formFieldStyles } from '../../styles';

import { BASE_GRID_HEIGHT } from '../../constants/layout';
import { datePickerPropTypes } from '../../propTypes/dateField';

const propTypes = {
  ...datePickerPropTypes,
  date: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
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
    fontWeight: 'bold',
  },
  datePicker: {
  },
});

export default class DatePickerIos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      animatedHeight: new Animated.Value(0),
    };
    this.theme = Boolean(props.theme) ? props.theme : false;
  }
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

  cancel = () => { this.closeModal(); }
  confirm = () => { this.closeModal(); }

  renderCancelButton = () => (
    <TouchableOpacity
      style={[styles.controlButton]}
      onPress={this.cancel}
    >
      <Text
        style={[
          styles.controlButtonText,
          { color: 'red' },
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
          { color: 'blue' },
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
          <DatePickerIOS
            style={styles.datePicker}
            mode={'date'}
            date={this.props.date}
            onDateChange={this.props.onDateChange}
          />
        </Animated.View>
      </View>
    </Modal>
  )

  render() {
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
            {this.props.date.toString()}
          </Text>
        </TouchableOpacity>
        {this.renderModal()}
      </View>
    );
  }

}

DatePickerIos.propTypes = propTypes;
DatePickerIos.defaultProps = defaultProps;
