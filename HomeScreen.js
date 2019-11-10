import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      base64: '',
      googleResponse: null
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Camera
            ref={ref => { this.camera = ref; }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={async () => {
                  if (this.camera) {
                    let photo = await this.camera.takePictureAsync({base64: true});
                    this.setState({ base64: photo.base64 })

                    try {
                      this.setState({ uploading: true });
                      let { base64 } = this.state;
                      let body = JSON.stringify({
                        requests: [
                          {
                            'features': [
                              {
                                'type': 'LOGO_DETECTION',
                                "maxResults": 1,
                              },
                            ],
                            "image": {
                              "content": base64
                            },
                          }
                        ]
                      });
                      let response = await fetch(
                        `https://vision.googleapis.com/v1/images:annotate?key=${googleCloudApiKey}`,
                        {
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json"
                          },
                          method: "POST",
                          body: body
                        }
                      );
                      let responseJson = await response.json();
                      console.log(responseJson);
                      this.setState({
                        googleResponse: responseJson,
                        uploading: false
                      });
                    } catch (error) {
                      console.log(error);
                    }
                  };
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Take Photo </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </SafeAreaView>
      );
    }
  }
}
