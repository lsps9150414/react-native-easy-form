import React, {
  Component,
} from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

const propTypes = {};

const defaultProps = {};

const styles = StyleSheet.create({
  base: {
    width: 0,
    borderWidth: 0,
    backgroundColor: 'yellow',
  },
  vertical: {
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
});

export default class Separator extends Component {
  render() {
    return (
      <View style={[styles.base, styles.vertical]} />
    );
  }

}

Separator.propTypes = propTypes;
Separator.defaultProps = defaultProps;
