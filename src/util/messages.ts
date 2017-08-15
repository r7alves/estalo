import { Injectable} from '@angular/core';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class Messages {
  public user: any = {}

  constructor(public fabebook: Facebook) {
     if (this.user.id == null) {
      this.getUser()
    }
  }

  /* ngOnInit(){
    this.getUser()
  } */


  getUser() {
    this.fabebook.login(['user_friends']).then(res => {
      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
      firebase.auth().signInWithCredential(fc).then(fs => {
        let authData: any
        authData = fs.providerData[0]
        this.user.name = authData.displayName
        this.user.id = authData.uid
        console.log('chegamos ao get user de message ' + this.user.id)
      }).catch(ferr => {
        alert("firebase erro" + (ferr))
      })
    }).catch(err => {
      alert('chegamos aqui' + JSON.stringify(err))
    })
  }

  send(friend, message, position) {
    let ref = firebase.database().ref()
    return ref.child('messages').child(friend.id).push().set({
      senderId: this.user.id,
      senderName: this.user.name,
      message: message,
      lat: 2.8198101,
      //lat: position.lat,
      lng: -60.68676310000001,
      //lng: position.lng,
      address: "Av. Gen. Ataíde Teive, 763 - Doutor Silvio Leite, Boa Vista - RR, 69314-382, Brasil",
      //address: position.address,
      read: false
    })
  }


  getMessage(successCallback) {
    this.user.id = 1678238025542655
    let ref = firebase.database().ref('messages').child(this.user.id)
    ref.orderByChild('read').equalTo(false).on('child_added', (snapshot) => {
      let message = snapshot.val()
      successCallback(message)
    })
  }

}
