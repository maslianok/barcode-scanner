import React, { PureComponent } from 'react';
import { StatusBar, Text, View, Alert, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import DropdownAlert from 'react-native-dropdownalert';

import { scanCode, restoreCodes, clearCodes } from './actions';
import { selectCodes } from './selectors';
import { CODES_WHITELIST } from '../../constants';

import s from './styles';

class Scanner extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
    };

    this.disabled = false;
  }

  async componentDidMount() {
    const { dispatchRestoreCodes } = this.props;
    dispatchRestoreCodes();

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  onCodeScan = ({ data }) => {
    const { codes, dispatchScanCode } = this.props;

    if (this.disabled) {
      return undefined;
    }

    this.disabled = true;

    if (CODES_WHITELIST.indexOf(data) === -1) {
      return this.dropdown.alertWithType('error', '', 'Invalid Barcode');
    }

    if (codes.indexOf(data) !== -1) {
      return this.dropdown.alertWithType('error', '', 'Duplicate Ticket Number');
    }

    dispatchScanCode(data);
    Alert.alert(
      'Success',
      'Ticket recognized',
      [
        {
          text: 'OK',
          onPress: () => {
            this.disabled = false;
          },
        },
      ],
      { cancelable: false },
    );
    return undefined;
  };

  onClear = () => {
    const { dispatchClearCodes } = this.props;
    dispatchClearCodes();
    return this.dropdown.alertWithType('success', '', 'AsyncStorage cleared');
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={s.wrapper}>
        <StatusBar hidden={false} barStyle="light-content" />
        <View style={s.header}>
          <View style={s.title}>
            <Text style={s.titleText}>SCAN TICKET</Text>
          </View>
          <TouchableOpacity style={s.clearButton} onPress={this.onClear}>
            <Text style={s.clearButtonText}>CLEAR</Text>
          </TouchableOpacity>
        </View>
        <BarCodeScanner onBarCodeRead={this.onCodeScan} style={s.container} />
        <DropdownAlert
          messageStyle={s.messageStyle}
          imageStyle={s.imageStyle}
          onClose={() => {
            this.disabled = false;
          }}
          ref={(ref) => {
            this.dropdown = ref;
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  codes: selectCodes(),
});

const mapDispatchToProps = {
  dispatchScanCode: scanCode,
  dispatchRestoreCodes: restoreCodes,
  dispatchClearCodes: clearCodes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);

Scanner.propTypes = {
  dispatchScanCode: PropTypes.func,
  dispatchRestoreCodes: PropTypes.func,
  dispatchClearCodes: PropTypes.func,
  codes: PropTypes.array,
};
