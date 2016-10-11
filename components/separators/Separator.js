import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { SEPERATOR_COLOR } from '../../constants/color';
import { formToFieldPropTypes } from '../../propTypes';
import { separatorPropTypes } from '../../propTypes/components';

const propTypes = {
  ...separatorPropTypes,
};

const defaultProps = {};

const contextTypes = {
  ...formToFieldPropTypes,
};

const styles = StyleSheet.create({
  base: {
    height: 0,
    borderWidth: 0,
  },
  horizontal: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: SEPERATOR_COLOR,
  },
});

export default class Separator extends Component {
  render() {
    return (
      <View
        style={[
          styles.base,
          styles.horizontal,
          Boolean(this.context.theme) && Boolean(this.context.theme.separatorColor)
            && { borderColor: this.context.theme.separatorColor },
          Boolean(this.props.style) && this.props.style,
        ]}
      />
    );
  }

}

Separator.propTypes = propTypes;
Separator.defaultProps = defaultProps;
Separator.contextTypes = contextTypes;
