import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { Notifications, Permissions, Constants } from 'expo'
import moment from 'moment'; // 2.22.1
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay'


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {url: '',
                  loading: false}  
                  
     const notification = setInterval(() => {
      this.getBeagle()
      this._sendDelayedNotification()
    }, 100000)
  }

  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.')
    }
    this.getBeagle()
    Notifications.addListener(this._handleNotification);
  }
  componentWillUnmount(){
    this.notification.clearInterval()
  }

  // Private methods

  _handleNotification = ({ origin, data }) => {
    console.info(`Notification (${origin}) with data: ${JSON.stringify(data)}`)
  }

  _sendImmediateNotification () {
    const localNotification = {
      title: 'Immediate testing Title',
      body: 'Testing body',
      data: { type: 'immediate' }
    }

    console.log('Scheduling immediate notification:', { localNotification })

    Notifications.presentLocalNotificationAsync(localNotification)
      .then(id => console.info(`Immediate notification scheduled (${id})`))
      .catch(err => console.error(err))
  }

  _sendDelayedNotification () {
    const localNotification = {
      title: 'Delayed testing Title',
      body: 'Testing body',
      data: { type: 'delayed' }
    }
    const schedulingOptions = {
      time: (new Date()).getTime() + 5000
    }

    console.log('Scheduling delayed notification:', { localNotification, schedulingOptions })

    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
      .then(id => console.info(`Delayed notification scheduled (${id}) at ${moment(schedulingOptions.time).format()}`))
      .catch(err => console.error(err))
  }

  getBeagle() {
    const pages = 100
    const page = Math.floor(Math.random() * Math.floor(pages))
    const url = `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=91ba73ffd2ac68160f449dcff46eeedb&group_id=332427@N24&page=${page}&format=json&nojsoncallback=1`
    const self = this
    
    this.setState({loading: true})
        axios.get(url).then((result) => {
        
            const photos = result.data.photos.photo
            const photo = photos[Math.floor(Math.random() * photos.length -  1)]
            console.log(photos.length)
            const uri = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`
            self.setState({url: uri , loading: false})
    
         }).catch((err) => {
             console.log(err)
             self.setState({loading: false})
         })
    
  }
  render() {
    // let header = {
    //   uri: {require('/home/jay/Documents/2018/projects/dailyBeagle/dailybeagle.png')}
    // }
    let pic = {
      uri: this.state.url
    }
    return (
      <View style={styles.container}>
          <Image source={require('/home/jay/Documents/2018/projects/dailyBeagle/dailybeagle.png')} style={styles.header} />
        <Spinner visible={this.state.loading} />
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
    marginTop: 10
  },
  header: {
    width: 380,
    height: 150,
  },
  image: {
    width: 350,
    height: 400,
    marginBottom: 10
  }
});
