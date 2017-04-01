import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
  user_interests: any[] = []
  user_sources: any[] = []
  source_ids: any[] = []
  articles: any = []

  constructor(public navCtrl: NavController, public loading: LoadingController, public navParams: NavParams, public http: Http, public storage: Storage) {

    // //Get user_interests pushed from the interests page during signup
    // let interests = this.navParams.get('user_interests')

    // //Assign pushed interests into local user_interests array
    // this.user_interests = interests
    // console.log(this.user_interests)

    let loader = this.loading.create({
      content: 'Getting latest articles...',
    });

    loader.present().then(() => {

      console.log('Source Ids: ' + this.source_ids)

    console.log("Getting articles")

    this.storage.ready().then(() => {
      this.storage.get('source_ids').then((sources) => {

        let source_ids = sources

        console.log('Source Ids: ' + source_ids)

        console.log('Source Ids length: ' + source_ids.length)

        for(let i: number = 0; i < source_ids.length; i++){

          console.log('Gettting the articles for... ' + source_ids[i])

          let index = 0;

          this.http.get('https://newsapi.org/v1/articles?source=' + source_ids[i] + '&sortBy=latest&apiKey=' + this.newsapi_key).map((res) => res.json()).subscribe((data) => {

            console.log('Article response length: ' + data.articles.length)

            while (index < data.articles.length) {
                console.log('Current index: ' + index)
                this.articles.push(data.articles[index])
                index += 1
                console.log('Articles: ' + this.articles)
                
              }

            // this.articles.push(data.articles)

            // console.log('Articles: ' + this.articles)

          })
          
        }

      })

    })

      loader.dismiss()

    })

  }

  view_article(article) {

    console.log('Article viewed')

}

article_source(source) {

  console.log('Source opened')

}


  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }

}
