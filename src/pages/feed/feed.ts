import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the Feed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  newsapi_key: string = 'bb760047fe38451480798662b487c974'
  user_interests: any = []
  user_sources: any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage) {

    //Get user_interests pushed from the interests page during signup
    let interests = this.navParams.get('user_interests')

    this.user_interests = interests
    console.log(this.user_interests)

    

    for(let interest of this.user_interests){

      let source_index = 0;

      this.http.get('https://newsapi.org/v1/sources?category=' + interest).map((res) => res.json()).subscribe((data) => {
        console.log(data)
        console.log('data length: ' + data.sources.length)

        while (source_index < data.sources.length) {
          console.log('Current index: ' + source_index)
          this.user_sources.push(data.sources[source_index].name)
          source_index += 1
          console.log('Sources: ' + this.user_sources)
        }
        this.storage.ready().then(() => {
          this.storage.set('user_sources', this.user_sources)
          console.log('User sources saved');
        })
        
      })

    }
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

}
