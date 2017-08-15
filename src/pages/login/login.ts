import { Component } from '@angular/core';
import {  App , } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase  from 'firebase';
import { MenuPage } from '../menu/menu';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  public user: any ={}


  constructor(public app : App, public fabebook:Facebook) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }


  fbLogin (){
    this.fabebook.login(['user_friends']).then(res=>{
      const fc=firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
      firebase.auth().signInWithCredential(fc).then(fs=>{
        let token = res.authResponse.accessToken
        this.setUser(token, fs.providerData[0] )
        this.app.getActiveNav().setRoot(MenuPage)
      }).catch(ferr=>{
        alert("firebase erro" + (ferr))
      })
    }).catch(err=>{
      alert(JSON.stringify(err))
    })
  }


  private setUser(token:string, authData: any){
    this.user.name = authData.displayName
    this.user.photo = authData.photoURL
    this.user.id = authData.uid
    this.user.token = token
    console.log(this.user.id)
    this.saveUser()
  }



  private saveUser(){
    firebase.database().ref('users').child(this.user.id).set({
      name: this.user.name,
      photo: this.user.photo
    })
  }



}
