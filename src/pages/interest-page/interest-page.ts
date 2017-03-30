import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { FeedPage } from '../feed/feed';

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
new_interest: string;
  default_interests: any = [
    {
      title: "Technology",
      isChecked: false 
    },
    {
      title: "Business",
      isChecked: false 
    },
    {
      title: "Entertainment",
      isChecked: false 
    },
    {
      title: "Music",
      isChecked: false 
    },
    {
      title: "Sports",
      isChecked: false 
    },
    {
      title: "Gaming",
      isChecked: false 
    },
    {
      title: "Science and Nature",
      isChecked: false 
    },
  ];

  user_interests: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public alert: AlertController,
  public storage: Storage) {

    
    
  }

  /**
   * @description Toggle checked state of interest checkboxes
   * 
   * @param {any} interest 
   * 
   * @memberOf InterestPage
   */
  toggleChecked(interest) {
      interest.isChecked = !interest.isChecked
      console.log(interest.title + ' \'s check status is: ' + interest.isChecked)
  }

  /**
   * @description Function to allow user enter a custom interest on button click from html template
   * 
   * 
   * @memberOf InterestPage
   */
  customInterest() {
    let prompt = this.alert.create({
      title: 'Add custom interest',
      message: 'Enter one of your interests here',
      //input field to collect user data
      inputs: [
        {
          //store user data under data.new_interest
          name: 'new_interest',
          placeholder: 'custom interest',
        }
      ],
      //Button to perform DOM change 
      buttons: [
        {
          text: 'Add',
          //Button handler to push input data into interets arrray
          handler: data =>{
            console.log(data)
            this.pushInterest(data.new_interest);
          }
        }
      ]
    });
    prompt.present();
  }
  /**
   * @description Function to push custom interest entered by user in prompt to the interests array
   * 
   * @param {any} interest 
   * 
   * @memberOf InterestPage
   */
  pushInterest(interest) {
    this.default_interests.push({
      title: interest,
      isChecked: true
    });
    console.log(this.default_interests)
  }


  /**
   * @description Function to populate user user_interests array with accepted interests by user
   * 
   * 
   * @memberOf InterestPage
   */
  addUserInterest() {
    for (let interest of this.default_interests){
      if(interest.isChecked == true){
        this.user_interests.push(interest.title)
        console.log(this.user_interests)
      }
      //set user specified interests
      this.storage.ready().then(() => {
        this.storage.set('interests', this.user_interests)
      })
    }
    this.toFeedPage();
  }
//Move user to the Feed Page
  toFeedPage() {
    this.navCtrl.push(FeedPage, {
      user_interests: this.user_interests
    })
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestPage');
  }

}
