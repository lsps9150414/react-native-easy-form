import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Text,
  View,
} from 'react-native';

import { formFieldStyles } from '../styles';

const propTypes = {
  title: PropTypes.string.isRequired,
  containerStyle: View.propTypes.style,
  textStyle: Text.propTypes.style,
};

const defaultProps = {};

export default class Label extends Component {

  render() {
    return (
      <View style={[formFieldStyles.labelContainer, this.props.containerStyle]}>
        <Text style={[formFieldStyles.label, this.props.textStyle]}>
          {this.props.title}
        </Text>
      </View>
    );
  }

}

Label.propTypes = propTypes;
Label.defaultProps = defaultProps;
