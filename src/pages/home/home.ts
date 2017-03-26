import { Component } from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { InterestPage } from '../interest-page/interest-page';
import { FeedPage } from '../feed/feed';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  newUsername: any;
  newEmail: any;
  newPassword: any;
  retEmail: any;
  retUsername: any;
  retPassword: any;

  constructor(public navCtrl: NavController,  public auth: Auth,  public user: User, 
                      public alert: AlertController, public loading: LoadingController, public toast: ToastController,
                      public storage: Storage) { 
  }

  toInterestPage() {
    this.navCtrl.push(InterestPage);
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
      //set navigation root page to the FeedPage 
      this.navCtrl.setRoot(FeedPage);
    });
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

      //Set user cloud details
      this.user.details.username = this.newUsername;
      this.user.details.email = this.newEmail;
      this.user.details.password = this.newPassword;

      //store user data locally
      this.storage.ready().then(() => {
        this.storage.set('username', this.user.details.username)
        this.storage.set('email', this.user.details.email)
        this.storage.set('password', this.user.details.password)
      })

      //retrieve user data from local storage
      this.storage.ready().then(() => {
        this.storage.get('username').then((val) => {
          this.retUsername = val
          console.log('Retrieved username: ' + this.retUsername)
        });
        this.storage.get('email').then((val) => {
          this.retEmail = val
          console.log('Retrieved Email: ' + this.retEmail)
        });
        this.storage.get('password').then((val) => {
          this.retPassword = val
          console.log('Retrieved Password: ' + this.retPassword)
        });

        console.log(this.retEmail + ' ' + this.retPassword + ' ' + this.retUsername);
      });

      //Take user to select interests
      this.toInterestPage()

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

}
