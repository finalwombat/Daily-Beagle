import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import axios from 'axios'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {url: '',
                  loading: false}
  }

  getBeagle() {
    const pages = 359
    const page = Math.floor(Math.random() * Math.floor(pages))
    const url = `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=91ba73ffd2ac68160f449dcff46eeedb&group_id=93217210%40N00&page=${page}&format=json&nojsoncallback=1`
    const self = this
    
    this.setState({loading: true})
        axios.get(url).then((result) => {
        
            const photos = result.data.photos.photo
            const photo = photos[Math.floor(Math.random() * photos.length -  1)]
            console.log(photo)
            const uri = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`
            self.setState({url: uri , loading: false})
    
         }).catch((err) => {
             console.log(err)
             self.setState({loading: false})
         })
    
  }
  render() {
    let pic = {
      uri: this.state.url
    }
    return (
      <View style={styles.container}>
        <Image source={pic} style={styles.image}/>
        <Button
          onPress={this.getBeagle.bind(this)}
          title="Get Beagle"
          disabled={this.state.loading}
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
    width: 350,
    height: 400
  }
});
