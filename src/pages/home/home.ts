import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';

import { InterestPage } from '../interest-page/interest-page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newUsername: string;
  newEmail: any;
  newPassword: string;
  retEmail: any;
  retUsername: string;
  retPassword: string;

  constructor(public navCtrl: NavController,  public auth: Auth,  public user: User, 
                      public alert: AlertController, public loading: LoadingController, public toast: ToastController) {


    
  }

  toInterestPage() {
    this.navCtrl.push(InterestPage);
  }

//Signup function to sign up using the ionic cloud auth service
  signup() {

    let details: UserDetails = {'email': this.newEmail, 'password': this.newPassword};

    this.auth.signup(details).then(() => {
      // `this.user` is now registered
      let alert = this.alert.create({
        title: 'Successful',
        subTitle: 'Your new account has been successfully created. Enjoy!',
        buttons: ['Thanks']
      });
      alert.present();

      this.retEmail = this.newEmail;
      this.retPassword = this.newPassword;
      this.retUsername = this.newUsername;

    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        if (e === 'conflict_email') {
          let alert = this.alert.create({
            title: 'Email Already exists',
            subTitle: 'The email address you entered already exists. Please try another',
            buttons: ['Ok']
          });
          alert.present();
        } else if(e === 'invalid_email'){
          // handle invalid_email error
          let alert = this.alert.create({
            title: 'Invalid Email',
            subTitle: 'The email address you entered is invalid. Please try another',
            buttons: ['Ok']
          });
          alert.present();
        } else if( e === 'conflict_username') {
          // handle conflict_username error
          let alert = this.alert.create({
            title: 'Username Alredy Exists',
            subTitle: 'The username you entered is invalid. Please try another',
            buttons: ['Ok']
          });
          alert.present();
        } else if (e === 'required_email') {
          // handle required_email error
          let alert = this.alert.create({
            title: 'Email Address Required',
            subTitle: 'Please enter a valid email address to continue',
            buttons: ['Sure Thing']
          });
          alert.present();
        } else if (e === 'required_password') {
          // handle required_password error
          let alert = this.alert.create({
            title: 'A Password Required',
            subTitle: 'Please enter a password to continue',
            buttons: ['No Problem']
          });
          alert.present();
        } else {
          // handle other errors
          let alert = this.alert.create({
            title: 'Unexpected Error',
            subTitle: 'An Unexpected error occured. Please check your network connection or try again later',
            buttons: ['I will be back']
          });
          alert.present();
        }
      }
    });

  }

  login() {
    //login user
    let details = {'email': this.retEmail, 'password': this.retPassword};

    this.auth.login('basic', details).then(() => {
      //Successful login
      let toast = this.toast.create({
        message: "Login Successful",
        duration: 1500
      });
      toast.present();
    });
  }

}
