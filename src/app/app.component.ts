import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Auth } from '@ionic/cloud-angular';

import { HomePage } from '../pages/home/home';
import { InterestPage } from '../pages/interest-page/interest-page';
import { FeedPage } from '../pages/feed/feed';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 // public rootPage : any;
 rootPage = InterestPage

  constructor(platform: Platform, public auth: Auth) {

    // if(this.auth.isAuthenticated()) {
    //   this.rootPage = FeedPage
    // } else {
    //   this.rootPage = HomePage
    // }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
