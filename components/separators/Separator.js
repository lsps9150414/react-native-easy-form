import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { separatorPropTypes } from '../../propTypes/components';

const propTypes = {
  ...separatorPropTypes,
};

const defaultProps = {};

const styles = StyleSheet.create({
  base: {
    height: 0,
    borderWidth: 0,
  },
  horizontal: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
});

export default class Separator extends Component {
  render() {
    return (
      <View
        style={[
          styles.base,
          styles.horizontal,
          Boolean(this.props.style) && this.props.style,
        ]}
      />
    );
  }

}

Separator.propTypes = propTypes;
Separator.defaultProps = defaultProps;
