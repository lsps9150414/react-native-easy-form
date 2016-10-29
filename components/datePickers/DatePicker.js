import React, {
  Component,
  PropTypes,
} from 'react';

import {
  Text,
} from 'react-native';

const propTypes = {};

const defaultProps = {};

export default class MyComponent extends Component {

  render() {
    return (
      <Text>This is the web date picker</Text>
    );
  }

}

MyComponent.propTypes = propTypes;
MyComponent.defaultProps = defaultProps;
