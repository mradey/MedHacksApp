import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';

export default class ETScreen extends React.Component {
  state = {
    faces: {},
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission:status==='granted'});
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <Camera
      style={{flex: 1}}
      type={'front'}
      onFacesDetected={this.handleFacesDetected}
      faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.accurate,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications: FaceDetector.Constants.Landmarks.all
      }}>
      </Camera>
      </View>
    );
  
  }
  
  handleFacesDetected = ({ faces }) => {
    this.setState({ faces });
    console.log(faces);
  }
}