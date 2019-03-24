import React from 'react';
import {View, Dimensions, StyleSheet, Text, Image} from 'react-native';
import { Camera, Permissions, FaceDetector, Video } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('../assets/images/icon.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}
export default class ETScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle/>,
    headerStyle: {
      backgroundColor: '#1e8bc3',
    },
    headerTintColor: '#09233d',
  };
  state = {
    faces: {},
    leftX: 0,
    leftY: 0,
    rightX: 0,
    rightY: 0,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    mute: false,
    shouldPlay: true,
  };

  async componentWillMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission:status==='granted'});
  }

  handlePlayAndPause = () => {  
    this.setState((prevState) => ({
       shouldPlay: !prevState.shouldPlay  
    }));
  }
  
  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,  
    }));
  }

  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Camera
        style={{width: 0, height: 0}}
        type={'front'}
        onFacesDetected={this.handleFacesDetected}
        faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.accurate,
            detectLandmarks: FaceDetector.Constants.Landmarks.all,
            runClassifications: FaceDetector.Constants.Landmarks.all
        }}>
        </Camera>
        <Text>Left eye X position: {this.state.leftX}</Text>
        <Text>Left eye Y position: {this.state.leftY}</Text>
        <Text>Right eye X position: {this.state.rightX}</Text>
        <Text>Right eye Y position: {this.state.rightY}</Text>
        <Video
        source={require('../assets/videos/JFK.mp4')}
        shouldPlay = {this.state.shouldPlay}
        resizeMode="cover"
        style={{width, height: 300}}
        isMuted={this.state.mute}
        />
        <View style={styles.controlBar}>
          <MaterialIcons 
            name={this.state.mute ? "volume-mute" : "volume-up"}
            size={45} 
            color="white" 
            onPress={this.handleVolume} 
          />
          <MaterialIcons 
            name={this.state.shouldPlay ? "pause" : "play-arrow"} 
            size={45} 
            color="white" 
            onPress={this.handlePlayAndPause} 
          />
        </View>
      </View>
    );
  
  }
  
  handleFacesDetected = ({ faces }) => {
    //this.setState({ faces });
    if (faces.length != 0) {
      console.log("left eye position: ");
      console.log(faces[0].leftEyePosition.x);
      console.log(faces[0].leftEyePosition.y);
      console.log("right eye position: ");
      console.log(faces[0].rightEyePosition.x);
      console.log(faces[0].rightEyePosition.y);
      this.setState({
        leftX: faces[0].leftEyePosition.x,
        leftY: faces[0].leftEyePosition.y,
        rightX: faces[0].rightEyePosition.x,
        rightY: faces[0].rightEyePosition.y
      });
    }
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
});