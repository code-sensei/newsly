import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the InterestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-interest',
  templateUrl: 'interest-page.html'
})
export class InterestPage {

  interests: any = [
    {
      title: "Technology",
      isChecked: false 
    },
    {
      title: "Business",
      isChecked: false 
    },
    {
      title: "Geek Stuff",
      isChecked: false 
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  toggleChecked(interest) {
      interest.isChecked = !interest.isChecked
      console.log(interest.title + ' \'s check status is: ' + interest.isChecked)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestPagePage');
  }

}
