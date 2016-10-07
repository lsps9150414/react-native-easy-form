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
    borderWidth: 0,
    backgroundColor: 'yellow',
    height: 0,
  },
  horizontal: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});

export default class Separator extends Component {
  render() {
    return (
      <View style={[styles.base, styles.horizontal]} />
    );
  }

}

Separator.propTypes = propTypes;
Separator.defaultProps = defaultProps;
