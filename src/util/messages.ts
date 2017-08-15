import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class Messages {
  public user: any = {}

  constructor(public fabebook: Facebook) {
      this.getUser()
  }


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

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // esse metodo vai repetir o loop até o id aparecer...
  // podemos tratar quando der erro na rede esse loop vai ser infinito
  //a solução é dexiar um limite de tentativas
  getUserData() {
    var limit = 10;// 10 tentativas
    return new Promise<any>((success, fail) => {

      let loop: () => void = () => {
        setTimeout(() => {
          if (this.user.id)
            success(this.user);
          else if(limit--) // no typescript 0 é a mesma coisa que "false", enquanto for maior faz o loop
            loop();// esse "--" faz o decremento da variavel
          else
            fail('timeout');
        }, 300);
      }
    });
  }

  getMessage(successCallback) {
    this.getUserData().then(
      (userData) => {

        //this.user.id = 1678238025542655 // setando manual
        console.log('getMessage ' + this.user.id)
        let ref = firebase.database().ref('messages').child(this.user.id)
        ref.orderByChild('read').equalTo(false).on('child_added', (snapshot) => {
          let message = snapshot.val()
          successCallback(message)
        })
      },
    (error) => {
      console.log(error);//timeout
    });
  }

}
