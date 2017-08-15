import { Component } from '@angular/core';
import {/*   App, */  NavController  } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase  from 'firebase';
import { MessageMapPage } from '../message-map/message-map';


@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  friends: any= []
  constructor(
    /* public app: App, */
    public navCtrl: NavController,
    public fabebook:Facebook,

  ) {
    this.initPage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }


  private initPage(){
    this.fabebook.login(['user_friends']).then(res=>{
      var fc=firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
       this.fabebook.api('me/friends?access_token' + fc, [])
      .then(response =>{
        this.friends = response.data
        //successCallbak(friends)
      })

    }).catch(err=>{
      alert(JSON.stringify(err))
    })

  }


  openMap(friend){
    console.log('chegamos aqui push')
    this.navCtrl.push(MessageMapPage, {friend})
  }


}
