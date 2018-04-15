import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import getBeagle from './getBeagle'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {url: ''}
  }

  getUri() {
    const that = this
    getBeagle( url => {
      that.setState( {url :url})
    })
  }
  render() {
    let pic = {
      uri: this.state.image
    }
    return (
      <View style={styles.container}>
        <Image source={pic} style={styles.image}/>
        <Button
          onPress={this.getUri}
          title="Get Beagle"
        />
      </View>
    );
  }
}

function getUrl() {}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 193,
    height: 110
  }
});
