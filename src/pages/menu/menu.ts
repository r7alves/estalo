import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FriendsPage } from '../friends/friends';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  rootPage: any = HomePage;
  home: any = HomePage;
  friends: any = FriendsPage;

  constructor(public app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  onMenu(page){
    this.rootPage = page;
  }

}
