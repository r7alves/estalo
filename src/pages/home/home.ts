import { Component, Injector } from '@angular/core';
import { App } from 'ionic-angular';
import { Messages } from '../../util/messages';
//import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   messages: Messages
   messagesList : any= []
  constructor(
    public app: App,
    public injector : Injector,
    ) {
     this.messages = injector.get(Messages)
     this.initPage()
  }

   initPage(){

    this.messages.getMessage(message => {
      this.messagesList.push(message)
    })
  }
}
