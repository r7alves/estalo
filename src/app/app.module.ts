import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { Geolocation  } from '@ionic-native/geolocation';
import { Messages } from '../util/messages';
import firebase  from 'firebase';


import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { FriendsPage } from '../pages/friends/friends';
import { MessageMapPage } from '../pages/message-map/message-map';


export const firebaseConfig = {
    apiKey: "AIzaSyBao77saxGkszD0JjmWCZwkZcPYhCbbWHs",
    authDomain: "estalomessage-8200c.firebaseapp.com",
    databaseURL: "https://estalomessage-8200c.firebaseio.com",
    projectId: "estalomessage-8200c",
    storageBucket: "estalomessage-8200c.appspot.com",
    messagingSenderId: "1076540373446"
}
firebase.initializeApp(firebaseConfig)
@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    FriendsPage,
    MessageMapPage,
    MenuPage,
    HomePage

  ],
  imports: [

    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    FriendsPage,
    MessageMapPage,
    MenuPage,
    HomePage

  ],
  providers: [
    Messages,
    StatusBar,
    Facebook,
    Geolocation,
    SplashScreen,
    LoginPage,

    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
