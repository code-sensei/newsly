import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { InterestPage } from '../interest-page/interest-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  toInterestPage() {
    this.navCtrl.push(InterestPage);
  }

}
