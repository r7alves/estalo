import { Component, Injector } from '@angular/core';
import { NavParams, App } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Messages } from '../../util/messages';

declare var google: any

@Component({

  selector: 'page-message-map',
  templateUrl: 'message-map.html',

})

export class MessageMapPage {

  friend: any
  message: string
  position: any = {}
  messages: Messages

  constructor(
    public app: App,
    public params: NavParams,
    public geolocation: Geolocation,
    public injector: Injector

  ) {

    this.messages = injector.get(Messages)

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageMapPage');
  }
  ngAfterViewInit() {
    this.initPage();

  }

  initPage() {
    this.friend = this.params.get('friend') || {}
    var options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then(result => {
      this.loadMap(result.coords.latitude, result.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    })
  }

  getAddress(latLng, successCallback) {
    let geocoder = new google.maps.Geocoder
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          successCallback(results[0].formatted_address)
        }
      }
    })
  }

  loadMap(lat, lng) {
    console.log('chegou aqui ' + lat + ' ' + lng)
    let latLng = new google.maps.LatLng(lat, lng)
    let mapOptions = {
      center: latLng,
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let element = document.getElementById('map_canvas')
    let map = new google.maps.Map(element, mapOptions)
    let marker = new google.maps.Marker({
      position: latLng
    })
    marker.setMap(map)
    this.getAddress(latLng, address => {
      this.position.lat = latLng.lat();
      this.position.lng = latLng.lng();
      this.position.address = address;

    })
  }

  onSendMessage() {
    console.log('chegamos aqui mmap')
    this.messages.send(this.friend, this.message, this.position).then(() => {
      this.app.getActiveNav().pop();
    })
  }

}
