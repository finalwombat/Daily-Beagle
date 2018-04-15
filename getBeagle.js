import axios from 'axios'

const key = "91ba73ffd2ac68160f449dcff46eeedb"
const secret = "23ef9c1a8e7d1503"
const group_id = "93217210@N00"
const pages = 359
const images = 100

export default function getBeagle(callback) {
    const page = Math.floor(Math.random() * Math.floor(pages))
    const url = `https://api.flickr.com/services/rest/?method=flickr.groups.pools.getPhotos&api_key=14e25604f9935f68c0062100df0e4341&group_id=93217210%40N00&page=${page}&format=json&nojsoncallback=1`

        axios.get(url).then((result) => {
        
            const photos = result.data.photos.photo
            const photo = photos[Math.floor(Math.random() * Math.random(photos.length -  1))]
            const uri = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
            console.log(callback)
            callback(uri)
    
         }).catch((err) => {
             console.log(err)
         })
    
   
}

